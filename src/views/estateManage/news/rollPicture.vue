<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-edit"
                 @click="handleCreate">{{ $t('table.add') }}</el-button>
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
                 placeholder="图片状态"
                 clearable
                 class="filter-item">
        <el-option label="已下架"
                   value="REMOVED" />
        <el-option label="已发布"
                   value="PUBLISHED" />
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
      <el-table-column label="标题"
                       align="center"
                       width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.head }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.publishTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布内容"
                       min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片"
                       align="center"
                       width="120">
        <template slot-scope="scope">
          <span class="link-type">
            <el-popover placement="right"
                        trigger="hover">
              <img :src="scope.row.imageUrl"
                   style="max-height:200px;">
              <img slot="reference"
                   :src="scope.row.imageUrl"
                   style="max-height:23px;vertical-align: bottom;">
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="发布者"
                       min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.announcer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读数"
                       align="center"
                       width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.readTimes"
                class="link-type"
                @click="handleFetchPv(scope.row.readTimes)">{{ scope.row.readTimes }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       class-name="status-col"
                       width="200">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.openOffstatus"
                     active-text="已发布"
                     inactive-text="已下架"
                     @change="handleChangeStatus(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')"
                       align="center"
                       width="230"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini"
                     type="success"
                     @click="handleReCreate(scope.row)">再发布</el-button>
          <el-button type="danger"
                     size="mini"
                     @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
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
        <el-form-item label="图片标题"
                      prop="title">
          <el-input v-model="temp.head" />
        </el-form-item>
        <el-form-item label="图片内容"
                      prop="content"
                      style="width:650px;">
          <tinymce v-model="temp.content" />
        </el-form-item>
        <el-form-item label="发布者"
                      prop="announcer">
          <el-input v-model="temp.announcer" />
        </el-form-item>
        <el-form-item label="上传图片">
          <Upload v-model="temp.imageUrl" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="dialogStatus=='update'"
                   type="primary"
                   @click="updateData">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="dialogStatus=='reCreate'"
                   type="primary"
                   @click="reCreateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchScrol,
  editScrol,
  deleteScrol
} from '@/api/commonSense'
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import Upload from '@/components/Upload/singleImage3'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: { Tinymce, Upload },
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
        status: '',
        beginTime: '',
        endTime: '',
        keyword: '',
        qryScrolPicData: [
          {
            status: '',
            content: '',
            communityId: ''
          }
        ]
      },
      temp: {
        id: '',
        head: '',
        content: '',
        publishTime: '',
        announcer: '',
        imageUrl: '',
        status: '',
        openOffstatus: '',
        communityId: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建',
        reCreate: '再发布'
      },
      rules: {
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.qryScrolPicData[0].communityId = this.userInfo.selectCommunity
      fetchScrol(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.qryScrolPicData
            for (let i = 0; i < this.list.length; i++) {
              if (this.list[i].status === 'PUBLISHED') {
                this.list[i].openOffstatus = true
              } else {
                this.list[i].openOffstatus = false
              }
            }
            this.total = response.data.data.totalCount
            this.listLoading = false
          }
        }
      })
    },
    handleFilter() {
      console.log(this.listQuery)
      this.listQuery.qryScrolPicData[0].communityId = this.userInfo.selectCommunity
      this.listQuery.beginTime = parseTime(this.listQuery.beginTime)
      this.listQuery.endTime = parseTime(this.listQuery.endTime)
      // 搜索数据（默认请求第一页数据）
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.qryInfoData[0].communityId = this.userInfo.selectCommunity
      this.listQuery.beginTime = parseTime(this.listQuery.beginTime)
      this.listQuery.endTime = parseTime(this.listQuery.endTime)
      // 每页显示多少条数据
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.qryInfoData[0].communityId = this.userInfo.selectCommunity
      this.listQuery.beginTime = parseTime(this.listQuery.beginTime)
      this.listQuery.endTime = parseTime(this.listQuery.endTime)
      // 显示第几页的数据
      this.listQuery.page = val
      this.getList()
    },
    resetTemp() {
      // 重新初始化新建对象的默认值
      this.temp = {
        id: '',
        head: '',
        content: '',
        publishTime: '',
        announcer: '',
        imageUrl: '',
        status: '',
        openOffstatus: '',
        communityId: this.userInfo.selectCommunity
      }
    },
    handleCreate() {
      // 新建一条信息
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate() // 清除表单的校验
      })
    },
    createData() {
      // 新建 提交确认
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.publishTime = parseTime(new Date())
          this.temp.status = 'REMOVED'
          editScrol(this.temp).then((response) => {
            if (response.status === 200) {
              if (response.data.code === 200) {
                // 新建成功后的回调
                if (response.data.data.status === 'PUBLISHED') {
                  response.data.data.openOffstatus = true
                } else {
                  response.data.data.openOffstatus = false
                }
                this.list.unshift(response.data.data)
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              }
            }
          })
        }
      })
    },
    handleUpdate(row) {
      // 修改/编辑事件
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // 修改/编辑 确认事件
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          editScrol(tempData).then((response) => {
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
              }
            }
          })
        }
      })
    },
    handleChangeStatus(row) {
      debugger
      this.temp = Object.assign({}, row) // copy obj
      if (this.temp.openOffstatus === true) {
        this.temp.status = 'PUBLISHED'
      } else {
        this.temp.status = 'REMOVED'
      }
      editScrol(this.temp).then((response) => {
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
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }
        }
      })
    },
    handleReCreate(row) {
      // 修改/编辑事件
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'reCreate'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    reCreateData() {
      // 修改/编辑 确认事件
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.id = ''
          tempData.publishTime = parseTime(new Date())
          tempData.status = 'PUBLISHED'
          editScrol(tempData).then((response) => {
            if (response.status === 200) {
              if (response.data.code === 200) {
                // 新建成功后的回调
                if (response.data.data.status === 'PUBLISHED') {
                  response.data.data.openOffstatus = true
                } else {
                  response.data.data.openOffstatus = false
                }
                this.list.unshift(response.data.data)
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: response.data.msg,
                  type: 'success',
                  duration: 2000
                })
              }
            }
          })
        }
      })
    },
    handleDelete(row) {
      // 在列表中删除 （将当前id传给后台）
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 在列表中删除 （将当前id传给后台）
        deleteScrol({ id: row.id }).then((response) => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
