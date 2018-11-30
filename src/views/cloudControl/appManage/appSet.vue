<template>
  <div class="app-container">
    <el-row :gutter="20" class="tac">
      <el-col :span="8">
        <h5>应用管理</h5>
        <el-menu
          class="el-menu-demo"
          mode="vertical"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect">
          <!-- 一级菜单没有子菜单 -->
          <el-menu-item v-for="child in appData" v-if="!child.children" :key="child.id" :index="child.id">
            <i class="el-icon-menu"/>
            <span slot="title">{{ child.name }}</span>
          </el-menu-item>
          <!-- 一级菜单有子菜单 -->
          <el-submenu v-for="child in appData" v-if="child.children" :key="child.id" :index="child.id">
            <template slot="title">
              <i class="el-icon-location"/>
              <span>{{ child.name }}</span>
            </template>
            <!-- 二级菜单没有子菜单 -->
            <el-menu-item v-for="child1 in child.children" v-if="!child1.children" :key="child1.id" :index="child1.id">
              <i class="el-icon-menu"/>
              <span slot="title">{{ child1.name }}</span>
            </el-menu-item>
            <!-- 二级菜单有子菜单 -->
            <el-submenu v-for="child1 in child.children" v-if="child1.children" :key="child1.id" :index="child1.id">
              <template slot="title">
                <i class="el-icon-location"/>
                <span>{{ child1.name }}</span>
              </template>
              <!-- 三级菜单没有子菜单 -->
              <el-menu-item v-for="child2 in child1.children" v-if="!child2.children" :key="child2.id" :index="child2.id">
                <i class="el-icon-menu"/>
                <span slot="title">{{ child2.name }}</span>
              </el-menu-item>
              <!-- 三级菜单有子菜单 -->
              <el-submenu v-for="child2 in child1.children" v-if="child2.children" :key="child2.id" :index="child2.id">
                <template slot="title">
                  <i class="el-icon-location"/>
                  <span>{{ child2.name }}</span>
                </template>
                <!-- 四级菜单没有子菜单 -->
                <el-menu-item v-for="child3 in child2.children" v-if="!child3.children" :key="child3.id" :index="child3.id">
                  <i class="el-icon-menu"/>
                  <span slot="title">{{ child3.name }}</span>
                </el-menu-item>
                <!-- 四级菜单有子菜单 -->
                <el-submenu v-for="child3 in child2.children" v-if="child3.children" :key="child3.id" :index="child3.id">
                  <template slot="title">
                    <i class="el-icon-location"/>
                    <span>{{ child3.name }}</span>
                  </template>
                  <!-- 五级菜单没有子菜单 -->
                  <el-menu-item v-for="child4 in child3.children" v-if="!child4.children" :key="child4.id" :index="child4.id">
                    <i class="el-icon-menu"/>
                    <span slot="title">{{ child4.name }}</span>
                  </el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="16">
        <div class="filter-container">
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-edit"
            @click="handleCreate">{{ $t('table.add') }}</el-button>
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
            label="ID"
            align="center"
            width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="图标"
            min-width="150px"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.icon }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标题名称"
            min-width="150px"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="链接地址/路由地址"
            min-width="150px"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.link }}</span>
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
            label-width="100px"
            style="width: 400px; margin-left:50px;">
            <el-form-item
              label="父节点ID"
              prop="parentId">
              <el-input v-model="temp.parentId" disabled/>
            </el-form-item>
            <el-form-item
              label="应用等级"
              prop="appGrade">
              <el-select v-model="temp.appGrade" placeholder="请选择应用等级" style="width:100%">
                <el-option
                  v-for="item in appGradeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="资源类型">
              <el-select v-model="temp.appResourceType" placeholder="请选择资源类型" style="width:100%">
                <el-option
                  v-for="item in appResourceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item
              label="应用优先级"
              prop="appPriority">
              <el-input v-model="temp.appPriority" />
            </el-form-item>
            <el-form-item
              label="应用编码"
              prop="appCode">
              <el-input v-model="temp.appCode" />
            </el-form-item>
            <el-form-item
              label="应用名称"
              prop="appName">
              <el-input v-model="temp.appName" />
            </el-form-item>
            <el-form-item
              label="应用图标"
              prop="appIcon">
              <el-input v-model="temp.appIcon" />
            </el-form-item>
            <el-form-item
              label="连接地址"
              prop="appLink">
              <el-input v-model="temp.appLink" />
            </el-form-item>
            <el-form-item label="应用可见">
              <el-radio-group v-model="temp.appStatus">
                <el-radio label="ENABLED">是</el-radio>
                <el-radio label="DISABLED">否</el-radio>
              </el-radio-group>
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

      </el-col>
    </el-row>

  </div>
</template>

<script>
import {
  fetchAppTree,
  fetchAppList,
  editApp
} from '@/api/appManage'
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
        lpageSize: 20,
        parentId: '',
        searchKey: '',
        appResourceType: ''
      },
      temp: {
        id: '',
        parentId: '',
        appGrade: '',
        appResourceType: '',
        appPriority: '',
        appCode: '',
        appName: '',
        appIcon: '',
        appLink: '',
        appStatus: ''
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
      },
      appGradeOptions: [
        {
          value: 'GRADE_PLATFORM',
          label: '平台版'
        },
        {
          value: 'GRADE_REGION',
          label: '区域版'
        },
        {
          value: 'GRADE_COMMUNITY',
          label: '小区版'
        },
        {
          value: 'GRADE_GROUP',
          label: '集团版'
        }
      ],
      appResourceTypeOptions: [
        {
          value: 'TYPE_GROUP',
          label: '分组'
        },
        {
          value: 'TYPE_APPLICATION',
          label: '应用'
        }
      ],
      appData: [],
      defaultActive: ''
    }
  },
  created() {
    this.getApp()
  },
  methods: {
    // 获取区域树 和 获取区域列表
    getApp() {
      fetchAppTree().then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            // this.appData = response.data.data
            this.appData = this.traverse(response.data.data)
            this.defaultActive = this.appData[0].id
            this.options = this.traverse(response.data.data)
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
        .catch(function(error) {
          console.log(error)
        })
      this.listLoading = true
      this.listQuery.parentId = '#'
      fetchAppList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.qryList
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
        .catch(function(error) {
          console.log(error)
        })
    },
    /* 转换树形结构数据 */
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
        parentId: '',
        appGrade: '',
        appResourceType: '',
        appPriority: '',
        appCode: '',
        appName: '',
        appIcon: '',
        appLink: '',
        appStatus: ''
      }
    },
    handleCreate() {
      // 新建一条信息
      this.resetTemp()
      this.temp.parentId = this.listQuery.parentId
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
          editApp(this.temp).then((response) => {
            if (response.status === 200) {
              if (response.data.code === 200) {
                // 新建成功后的回调
                const unshiftData = {}
                unshiftData.id = response.data.data.id
                unshiftData.parentId = response.data.data.parentId
                unshiftData.name = response.data.data.appName
                unshiftData.icon = response.data.data.appIcon
                unshiftData.link = response.data.data.appLink
                unshiftData.nodeType = ''
                unshiftData.appGrade = response.data.data.appGrade
                unshiftData.appResourceType = response.data.data.appResourceType
                unshiftData.permission = ''
                this.list.unshift(unshiftData)
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
      // this.temp = Object.assign({}, row) // copy obj
      this.temp = Object.assign({}, {}) // copy obj
      // this.resetTemp()
      this.temp.id = row.id
      this.temp.parentId = row.parentId
      this.temp.appGrade = row.appGrade
      this.temp.appResourceType = row.appResourceType
      this.temp.appPriority = ''
      this.temp.appCode = ''
      this.temp.appName = row.name
      this.temp.appIcon = row.icon
      this.temp.appLink = row.link
      this.temp.appStatus = ''
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
          editApp(tempData).then((response) => {
            if (response.status === 200) {
              if (response.data.code === 200) {
                for (const v of this.list) {
                  // 更新后的值插入原来数据的位置
                  if (v.id === this.temp.id) {
                    const index = this.list.indexOf(v)
                    const insertData = {}
                    insertData.id = response.data.data.id
                    insertData.parentId = response.data.data.parentId
                    insertData.name = response.data.data.appName
                    insertData.icon = response.data.data.appIcon
                    insertData.link = response.data.data.appLink
                    insertData.nodeType = ''
                    insertData.appGrade = response.data.data.appGrade
                    insertData.appResourceType = response.data.data.appResourceType
                    insertData.permission = ''
                    this.list.splice(index, 1, insertData)
                    break
                  }
                }
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
    handleDelete(row) {
      // deleteRegion({ id: row.id }).then((response) => {
      //   if (response.status === 200) {
      //     if (response.data.code === 200) {
      //       // 在列表中删除 （将当前id传给后台）
      //       const index = this.list.indexOf(row)
      //       this.list.splice(index, 1)
      //       this.$notify({
      //         title: '成功',
      //         message: '删除成功',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     } else {
      //       this.$notify.error({
      //         title: '失败',
      //         message: response.data.msg,
      //         duration: 2000
      //       })
      //     }
      //   } else {
      //     this.$notify.error({
      //       title: '失败',
      //       message: response.data.msg,
      //       duration: 2000
      //     })
      //   }
      // })
    },
    handleSelect(key, keyPath) {
      this.listLoading = true
      this.listQuery.parentId = key
      fetchAppList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.qryList
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
        .catch(function(error) {
          console.log(error)
        })
    },
    handleOpen(key, keyPath) {
      this.listLoading = true
      this.listQuery.parentId = key
      fetchAppList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.qryList
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
        .catch(function(error) {
          console.log(error)
        })
    },
    handleClose(key, keyPath) {
      this.listLoading = true
      this.listQuery.parentId = key
      fetchAppList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.qryList
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
        .catch(function(error) {
          console.log(error)
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
