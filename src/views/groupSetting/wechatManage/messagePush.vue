<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-edit"
                 @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-select v-model="listQuery.appid"
                 placeholder="公众号appid"
                 clearable
                 class="filter-item">
        <el-option v-for="item in wechatOptions"
                   :key="item.appid"
                   :label="item.appname"
                   :value="item.appid" />
      </el-select>
      <el-input v-model="listQuery.templateNo"
                placeholder="消息模板编号"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.msgName"
                placeholder="消息模板名称"
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
      <el-table-column label="消息模板名称"
                       align="center"
                       width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.msgName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公众号appid"
                       align="center"
                       width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.appid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小程序appid"
                       min-width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.miniAppid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板类型"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.templateType | typeFilter }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="模板编号"
        width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.templateNo }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        label="消息模板ID"
        width="280px">
        <template slot-scope="scope">
          <span>{{ scope.row.templateId }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="消息模板跳转"
                       min-width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小程序跳转"
                       min-width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.miniPagepath }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')"
                       align="center"
                       width="230"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            type="success"
            size="mini"
            @click="handleBind(scope.row)">公众号</el-button> -->
          <el-button type="primary"
                     size="mini"
                     @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
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
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <!-- <el-form-item
          label="ID"
          prop="id">
          <el-input v-model="temp.id" />
        </el-form-item> -->
        <el-form-item label="模板名称"
                      prop="msgName">
          <el-input v-model="temp.msgName" />
        </el-form-item>
        <el-form-item label="公众号appid"
                      prop="appid">
          <!-- <el-input v-model="temp.appid" /> -->
          <el-select :disabled="dialogStatus === 'update'"
                     v-model="temp.appid"
                     class="filter-item"
                     placeholder="请选择"
                     style="width:100%">
            <el-option v-for="item in wechatOptions"
                       :key="item.appid"
                       :label="item.appname"
                       :value="item.appid" />
          </el-select>
        </el-form-item>
        <el-form-item label="小程序appid"
                      prop="miniAppid">
          <!-- <el-input v-model="temp.miniAppid" /> -->
          <el-select v-model="temp.miniAppid"
                     class="filter-item"
                     placeholder="请选择"
                     style="width:100%">
            <el-option v-for="item in miniWechatOptions"
                       :key="item.appid"
                       :label="item.appname"
                       :value="item.appid" />
          </el-select>
        </el-form-item>
        <el-form-item label="模板类型"
                      prop="templateType ">
          <!-- <el-input v-model="temp.templateType" /> -->
          <el-select :disabled="dialogStatus === 'update'"
                     v-model="temp.templateType"
                     class="filter-item"
                     placeholder="请选择"
                     style="width:100%">
            <el-option v-for="item in typeOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="模板编号"
                      prop="templateNo">
          <el-input :disabled="dialogStatus === 'update'"
                    v-model="temp.templateNo" />
        </el-form-item>
        <el-form-item label="模板ID"
                      prop="templateId">
          <el-input v-model="temp.templateId" />
        </el-form-item>
        <el-form-item label="模板跳转值"
                      prop="url">
          <el-input v-model="temp.url" />
        </el-form-item>

        <el-form-item label="跳转小程序"
                      prop="miniPagepath">
          <el-input v-model="temp.miniPagepath" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-else
                   type="primary"
                   @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogBindVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="temp"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="小程序ID"
                      prop="id">
          <el-input v-model="temp.id"
                    disabled />
        </el-form-item>
        <el-form-item label="公众号"
                      prop="wechatMpId">
          <el-select v-model="wechatMpId"
                     class="filter-item"
                     placeholder="请选择公众号"
                     style="width:100%">
            <el-option v-for="item in wechatOptions"
                       :key="item.id"
                       :label="item.appname"
                       :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogBindVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='bind'"
                   type="primary"
                   @click="bindData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  bindPublicAccount,
  fetcMaBingMpId,
  fetchWxMsgPage,
  editWxMsg,
  deleteWxMsg,
  fetchWechatList,
  fetchsmallList
} from '@/api/wechat'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    typeFilter(status) {
      const statusMap = {
        '0': '车场缴费成功模板',
        '1': '车辆进出模板',
        '2': '车辆入场通知'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        appid: '',
        msgName: '',
        templateNo: '',
        keyword: ''
      },
      showReviewer: false,
      temp: {
        id: '',
        msgName: '',
        appid: '',
        templateType: '',
        templateNo: '',
        templateId: '',
        url: '',
        miniAppid: '',
        miniPagepath: ''
      },
      dialogFormVisible: false,
      dialogBindVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建',
        bind: '绑定公众号'
      },
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false,
      wechatOptions: [],
      miniWechatOptions: [],
      typeOptions: [
        {
          id: '0',
          name: '车场缴费成功模板'
        },
        {
          id: '1',
          name: '车辆进出模板'
        },
        {
          id: '2',
          name: '车辆入场通知'
        }
      ],
      wechatMpId: ''
    }
  },
  created() {
    this.getList()
    this.getWechatList()
    this.getSmallWechatList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchWxMsgPage(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.qryList
            this.total = response.data.data.totalCount
            this.listLoading = false
          }
        }
      })
    },
    handleFilter() {
      console.log(this.listQuery)
      // 搜索数据（默认请求第一页数据）
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleSizeChange(val) {
      // 每页显示多少条数据
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // 显示第几页的数据
      this.listQuery.currentPage = val
      this.getList()
    },
    resetTemp() {
      // 重新初始化新建对象的默认值
      this.temp = {
        id: '',
        msgName: '',
        appid: '',
        templateType: '',
        templateNo: '',
        templateId: '',
        url: '',
        miniAppid: '',
        miniPagepath: ''
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
          editWxMsg(this.temp).then((response) => {
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
          editWxMsg(tempData).then((response) => {
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
    handleDelete(row) {
      // 在列表中删除 （将当前id传给后台）
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteWxMsg({ id: row.id }).then((response) => {
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
    },
    handleBind(row) {
      // 绑定事件
      this.temp = Object.assign({}, row) // copy obj
      this.wechatMpId = ''
      console.log(this.temp)
      fetcMaBingMpId({ id: this.temp.id }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.wechatMpId = response.data.data
          }
        }
      })
      console.log(this.temp)
      this.dialogStatus = 'bind'
      this.dialogBindVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    bindData() {
      // 绑定 确认事件
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          bindPublicAccount({ wechatMaId: tempData.id, wechatMpId: this.wechatMpId }).then((response) => {
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
                this.dialogBindVisible = false
                this.$notify({
                  title: '成功',
                  message: response.data.msg,
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
    getWechatList() {
      fetchWechatList({}).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.wechatOptions = response.data.data
          }
        }
      })
    },
    getSmallWechatList() {
      fetchsmallList({ currentPage: 1, pageSize: 1000 }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.miniWechatOptions = response.data.data.qryList
          }
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
