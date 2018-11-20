<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-select
        v-model="listQuery.qryTelephoneElementData[0].serviceType"
        placeholder="服务类型"
        clearable
        class="filter-item">
        <el-option
          v-for="item in statusserviceOptions"
          :key="item.id"
          :label="item.label"
          :value="item.id" />
      </el-select>
      <el-input
        v-model="listQuery.keyword"
        placeholder="关键字"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:500px;">
      <el-table-column
        label="服务类型"
        width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.serviceType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="服务名称"
        width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.serviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="服务电话"
        min-width="150px"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.serviceNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="图片"
        align="center"
        width="120">
        <template slot-scope="scope">
          <span class="link-type">
            <el-popover
              placement="left"
              trigger="hover">
              <img :src="scope.row.imageUrl" style="max-height:200px;" >
              <img slot="reference" :src="scope.row.imageUrl" style="max-height:23px;vertical-align: bottom;" >
              <!-- <img src="https://cdn.duitang.com/uploads/item/201508/30/20150830105732_nZCLV.jpeg"
                   style="max-height:200px;">
              <img slot="reference"
                   src="https://cdn.duitang.com/uploads/item/201508/30/20150830105732_nZCLV.jpeg"
                   style="max-height:23px;vertical-align: bottom;"> -->
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        min-width="150px"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;">
        <el-form-item
          label="服务类型"
          prop="serviceType">
          <el-select
            v-model="temp.serviceType"
            class="filter-item"
            placeholder="请选择服务类型">
            <el-option
              v-for="item in statusserviceOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="服务名称"
          prop="serviceName">
          <el-input v-model="temp.serviceName" />
        </el-form-item>
        <el-form-item
          label="服务电话"
          prop="serviceNumber">
          <el-input v-model="temp.serviceNumber" />
        </el-form-item>
        <el-form-item
          label="备注"
          prop="memo">
          <el-input v-model="temp.memo" type="textarea" />
        </el-form-item>
        <el-form-item label="上传图片">
          <Upload v-model="temp.imageUrl" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  fetchList,
  editTelephone,
  deleteTelephone
} from '@/api/phone'
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        estate: 'info',
        periphery: 'danger'
      }
      return statusMap[status]
    }
  },
  components: { Tinymce, Upload },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        keyword: undefined,
        qryTelephoneElementData: [
          {
            serviceType: '',
            serviceName: ''
          }
        ]
      },
      statusserviceOptions: [
        {
          id: 'SERVICE_PROPERTY',
          label: '物业部门'
        },
        {
          id: 'SERVICE_ROUND',
          label: '周边服务'
        }
      ],
      showReviewer: false,
      temp: {
        id: '',
        serviceType: '',
        serviceName: '',
        serviceNumber: '',
        imageUrl: '',
        memo: '',
        operateUserId: '',
        updateTime: '',
        createTime: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
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
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.qryTelephoneElementData
            this.total = response.data.totalCount
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
      this.listQuery.qryTelephoneElementData[0].communityId = this.userInfo.selectCommunity
      console.log(this.listQuery)
      // 搜索数据（默认请求第一页数据）
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      // 每页显示多少条数据
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      // 显示第几页的数据
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      // 改变当前按钮的状态
      // console.log(row)
      // console.log(status)
      // 请求后台接口将状态传给后台，如果成功，前端修改数据
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      // 重新初始化新建对象的默认值
      this.temp = {
        id: '',
        serviceType: '',
        serviceName: '',
        serviceNumber: '',
        imageUrl: '',
        memo: '',
        operateUserId: '',
        updateTime: '',
        createTime: ''
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
      console.log(this.temp)
      // 新建 提交确认
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.createTime = parseTime(new Date())
          editTelephone(this.temp).then((response) => {
            if (response.status === 200) {
              if (response.data.code === 200) {
                // 新建成功后的回调
                this.list.unshift(response.data.data)
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '创建成功',
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
          editTelephone(tempData).then((response) => {
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
    },
    handleDelete(row) {
      // 在列表中删除 （将当前id传给后台）
      deleteTelephone({ id: row.id }).then((response) => {
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
