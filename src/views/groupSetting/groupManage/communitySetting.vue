<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-input
        v-model="listQuery.name"
        placeholder="请输入小区名字或编号"
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
        label="小区编码"
        align="center"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="小区名称"
        align="center"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="所属区域"
        align="center"
        width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.regionId }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="联系人"
        align="center"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="联系电话"
        align="center"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.telephone }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="小区所在城市"
        align="center"
        width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.city }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="详细地址"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.site }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleBind(scope.row)">公众号</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)">删除</el-button>
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
        label-width="100px"
        style="width: 400px; margin-left:50px;">
        <el-form-item
          label="所属区域"
          prop="statusservice">
          <el-select v-model="temp.regionId" filterable placeholder="所属区域" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item
          label="小区编码"
          prop="code">
          <el-input :disabled="dialogStatus === 'update'" v-model="temp.code" />
        </el-form-item>
        <el-form-item
          label="小区名称"
          prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item
          label="联系人"
          prop="contactname">
          <el-input v-model="temp.contact" />
        </el-form-item>
        <el-form-item
          label="联系电话"
          prop="telephone">
          <el-input v-model="temp.telephone" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.memo" type="textarea"/>
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

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogBindVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;">
        <el-form-item
          label="小区名称"
          prop="id">
          <el-select
            v-model="temp.id"
            disabled
            class="filter-item"
            placeholder="请选择小区"
            style="width:100%" >
            <el-option
              v-for="item in communityOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="绑定公众号"
          prop="wechatId">
          <el-select
            v-model="wechatId"
            class="filter-item"
            placeholder="请选择公众号"
            style="width:100%" >
            <el-option
              v-for="item in wechatOptions"
              :key="item.id"
              :label="item.appname"
              :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogBindVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='bind'"
          type="primary"
          @click="bindData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  fetchList,
  deleteCommunity,
  handelAddCommunity,
  fetchCommunity,
  fetchCommunityBindMpId
} from '@/api/communityManage'
import {
  fetchRegionOptions
} from '@/api/areaSetting'
import {
  fetchWechatList,
  bindCommunity
} from '@/api/wechat'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  data() {
    return {
      options: [],
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        name: '',
        code: ''
      },
      temp: {
        id: '',
        code: '',
        shortName: '',
        name: '',
        regionId: '',
        provice: '',
        city: '',
        country: '',
        site: '',
        zipCode: '',
        contanct: '',
        telephone: '',
        memo: ''

      },
      dialogFormVisible: false,
      dialogBindVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建',
        detail: '详情',
        bind: '绑定公众号'
      },
      pvData: [],
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
      },
      downloadLoading: false,
      communityOptions: [],
      wechatOptions: [],
      wechatId: ''
    }
  },
  created() {
    this.getList()
    this.getAreaList()
    this.getCommunityList()
    this.getWechatList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log(response)
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.qryCommunitydata
            this.total = response.data.data.totalCount
            this.listLoading = false
          }
        } else {
          this.$message({
            message: '请求失败成功',
            type: 'error'
          })
        }
      })
    },
    getAreaList() {
      const _this = this
      fetchRegionOptions({}).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.options = _this.traverse(response.data.data)
          }
        }
      })
    },
    /* 转换区域数据 */
    traverse(aeraTree) {
      aeraTree.forEach(i => {
        i.value = i.id
        i.label = i.name
        // 有子数据的先遍历子数据
        if (i.children) {
          if (i.children.length > 0) {
            this.traverse(i.children)
          } else {
            delete i.children
          }
        }
        // i.children && this.traverse(i.children)
      })
      return aeraTree
    },
    handleFilter() {
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
    resetTemp() {
      // 重新初始化新建对象的默认值
      this.temp = {
        id: '',
        code: '',
        shortName: '',
        name: '',
        regionId: '',
        provice: '',
        city: '',
        country: '',
        site: '',
        zipCode: '',
        contanct: '',
        telephone: '',
        memo: ''
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
          handelAddCommunity(this.temp).then((response) => {
            // 新建成功后的回调
            // console.log(response)
            // debugger
            if (response.status === 200) {
              if (response.data.code === 200) {
                // this.list.unshift(this.temp)
                this.getList()
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
          handelAddCommunity(tempData).then((response) => {
            if (response.status === 200) {
              if (response.data.code === 200) {
                // for (const v of this.list) {
                //   // 更新后的值插入原来数据的位置
                //   if (v.id === this.temp.id) {
                //     const index = this.list.indexOf(v)
                //     this.list.splice(index, 1, this.temp)
                //     break
                //   }
                // }
                this.getList()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
              }
            }
          })
        }
      })
    },
    handleDetail(row) {
      // 修改/编辑事件
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      // 在列表中删除 （将当前id传给后台）
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deleteCommunity({ id: row.id }).then(response => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
              this.listLoading = false
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
      this.wechatId = ''
      fetchCommunityBindMpId({ id: this.temp.id }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.wechatId = response.data.data
          }
        }
      })
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
          bindCommunity({ wechatId: this.wechatId, communityId: tempData.id }).then((response) => {
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
              }
            }
          })
        }
      })
    },
    getCommunityList() {
      fetchCommunity({}).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.communityOptions = response.data.data
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
    getWechatList() {
      fetchWechatList({}).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.wechatOptions = response.data.data
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
