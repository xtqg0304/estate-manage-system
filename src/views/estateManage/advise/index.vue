<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="listQuery.beginTime"
                      :picker-options="timePickerOptions"
                      class="filter-item-rangedate"
                      type="datetime"
                      placeholder="开始时间"
                      align="right" />
      <el-date-picker v-model="listQuery.endTime"
                      :picker-options="timePickerOptions"
                      class="filter-item-rangedate"
                      type="datetime"
                      placeholder="结束时间"
                      align="right" />
      <el-select v-model="listQuery.status"
                 placeholder="投诉状态"
                 clearable
                 class="filter-item">
        <el-option v-for="item in statusOptions"
                   :key="item.id"
                   :label="item.label"
                   :value="item.id" />
      </el-select>
      <el-input v-model="listQuery.keyword"
                placeholder="关键字"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />
      <el-button v-waves
                 class="filter-item"
                 type="primary"
                 icon="el-icon-search"
                 @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <el-table v-loading="listLoading"
              :key="tableKey"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%;min-height:500px;">
      <el-table-column label="投诉房号"
                       align="center"
                       width="300px">
        <template slot-scope="scope">
          <span>{{ scope.row.roomId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名称"
                       width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.announcer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码"
                       width="110px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投诉内容"
                       min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投诉时间"
                       width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.publishTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投诉状态"
                       class-name="status-col"
                       width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.status | statusFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')"
                       align="center"
                       width="230"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.status === 'Reply'||scope.row.status === 'PROCESSED'"
                     size="mini"
                     type="primary"
                     @click="handleModifyStatus(scope.row,'Reply')">回复
          </el-button>
          <el-button :disabled="scope.row.status === 'PROCESSED'"
                     size="mini"
                     type="primary"
                     @click="updateStatusData(scope.row,'PROCESSED')">完成
          </el-button>
          <el-button size="mini"
                     type="primary"
                     @click="handleShowDetail(scope.row)">{{ $t('table.detail') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page"
                     :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.limit"
                     :total="total"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="回复内容"
                      prop="reContent">
          <el-input v-model="temp.reContent"
                    type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus==='update'"
                   type="primary"
                   @click="updateStatusData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogDetailVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="投诉房产"
                      prop="id">
          {{ temp.id }}
        </el-form-item>
        <el-form-item label="投诉人"
                      prop="announcer">
          {{ temp.announcer }}
        </el-form-item>
        <el-form-item label="投诉人电话"
                      prop="telephone">
          {{ temp.telephone }}
        </el-form-item>
        <el-form-item label="投诉时间"
                      prop="author">
          {{ temp.publishTime }}
        </el-form-item>
        <el-form-item label="投诉状态">
          {{ temp.status | statusFilter }}
        </el-form-item>
        <el-form-item label="投诉内容">
          {{ temp.content }}
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogDetailVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary"
                   @click="dialogDetailVisible = false">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  editReport
} from '@/api/advise.js'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        PROCESSED: '已完成',
        WAITING: '待回复',
        Reply: '已回复'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      timePickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        status: undefined,
        beginTime: undefined,
        endTime: undefined,
        keyword: undefined,
        qryReportElementData: [
          {
            id: '',
            content: '',
            publishTime: '',
            communityId: '',
            announcer: '',
            telephone: '',
            operateUserId: '',
            imageUrl: ''
          }
        ]
      },
      statusOptions: [
        {
          id: 'WAITING',
          label: '待回复'
        },
        {
          id: 'Reply',
          label: '已回复'
        },
        {
          id: 'PROCESSED',
          label: '已完成'
        }
      ],
      temp: {
        id: '',
        content: '',
        publishTime: '',
        communityId: '',
        announcer: '',
        telephone: '',
        operateUserId: '',
        imageUrl: '',
        status: '',
        clickStatus: '',
        reContent: ''
      },
      dialogFormVisible: false,
      dialogDetailVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建',
        detail: '详情'
      },
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    communityId() {
      const sessionData = sessionStorage.getItem('selectCommunity')
      if (this.$store.state.user.selectCommunity === '' && sessionData) {
        this.$store.commit('SET_SELECTCOMMUNITY', sessionData)// 同步操作
      }
      return this.$store.state.user.selectCommunity
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.qryReportElementData[0].communityId = this.communityId
      fetchList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.qryReportElementData
            this.total = response.data.data.totalCount
            this.listLoading = false
          } else {
            this.$notify.error({
              title: '失败',
              message: response.data.msg,
              duration: 2000
            })
          }
        } else {
          this.$notify.error({
            title: '失败',
            message: response.data.msg,
            duration: 2000
          })
        }
      })
    },
    handleFilter() {
      this.listQuery.qryReportElementData[0].communityId = this.communityId
      this.listQuery.beginTime = this.listQuery.beginTime && parseTime(this.listQuery.beginTime)
      this.listQuery.endTime = this.listQuery.endTime && parseTime(this.listQuery.endTime)
      console.log(this.listQuery)
      // 搜索数据（默认请求第一页数据）
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      // 每页显示多少条数据
      this.listQuery.qryReportElementData[0].communityId = this.communityId
      this.listQuery.beginTime = this.listQuery.beginTime && parseTime(this.listQuery.beginTime)
      this.listQuery.endTime = this.listQuery.endTime && parseTime(this.listQuery.endTime)
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      // 显示第几页的数据
      this.listQuery.qryReportElementData[0].communityId = this.communityId
      this.listQuery.beginTime = this.listQuery.beginTime && parseTime(this.listQuery.beginTime)
      this.listQuery.endTime = this.listQuery.endTime && parseTime(this.listQuery.endTime)
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.temStatus = status
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateStatusData(row, status) {
      let tempData
      if (row.id === undefined) {
        tempData = Object.assign({}, this.temp)
        tempData.status = tempData.temStatus
        this.temp.status = this.temp.temStatus
        delete tempData.temStatus
        delete this.temp.temStatus
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            editReport(tempData).then((response) => {
              if (response.status === 200) {
                if (response.data.code === 200) {
                  for (const v of this.list) {
                    // 更新后的值插入原来数据的位置
                    if (v.id === this.temp.id) {
                      const index = this.list.indexOf(v)
                      this.list.splice(index, 1, this.temp)
                      break
                    }
                  }
                  this.dialogFormVisible = false
                  this.$notify({
                    title: '成功',
                    message: '更新成功',
                    type: 'success',
                    duration: 2000
                  })
                } else {
                  this.$notify.error({
                    title: '失败',
                    message: response.data.msg,
                    duration: 2000
                  })
                }
              } else {
                this.$notify.error({
                  title: '失败',
                  message: response.data.msg,
                  duration: 2000
                })
              }
            })
          }
        })
      } else {
        this.temp = Object.assign({}, row)
        this.temp.status = status
        tempData = Object.assign({}, this.temp)
        editReport(tempData).then((response) => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              for (const v of this.list) {
                // 更新后的值插入原来数据的位置
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify.error({
                title: '失败',
                message: response.data.msg,
                duration: 2000
              })
            }
          } else {
            this.$notify.error({
              title: '失败',
              message: response.data.msg,
              duration: 2000
            })
          }
        })
      }

      // 修改/编辑 确认事件
    },
    resetTemp() {
      // 重新初始化新建对象的默认值
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleShowDetail(row) {
      // 显示详情事件
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'detail'
      this.dialogDetailVisible = true
    }
  }
}
</script>
<style>
.filter-container .filter-item-rangedate {
  display: inline-flex;
  vertical-align: middle;
  margin-bottom: 10px;
}
.el-date-editor .el-range-separator {
  padding: 0;
}
.filter-container,
.pagination-container {
  text-align: right;
}
.editor-custom-btn-container {
  top: 0 !important;
}
</style>
