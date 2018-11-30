<template>
  <div class="app-container">
    <el-row :gutter="20" class="tac">
      <el-col :span="8">
        <h5>菜单树</h5>
        <el-menu
          :unique-opened="true"
          :default-active="defaultActive"
          class="el-menu-demo"
          mode="vertical"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect">
          <!-- 一级菜单没有子菜单 -->
          <el-menu-item v-for="child in navData" v-if="!child.children" :key="child.id" :index="JSON.stringify(child)">
            <i class="el-icon-menu"/>
            <span slot="title">{{ child.name }}</span>
          </el-menu-item>
          <!-- 一级菜单有子菜单 -->
          <el-submenu v-for="child in navData" v-if="child.children" :key="child.id" :index="JSON.stringify(child)">
            <template slot="title">
              <i class="el-icon-location"/>
              <span>{{ child.name }}</span>
            </template>
            <!-- 二级菜单没有子菜单 -->
            <el-menu-item v-for="child1 in child.children" v-if="!child1.children" :key="child1.id" :index="JSON.stringify(child1)">
              <i class="el-icon-menu"/>
              <span slot="title">{{ child1.name }}</span>
            </el-menu-item>
            <!-- 二级菜单有子菜单 -->
            <el-submenu v-for="child1 in child.children" v-if="child1.children" :key="child1.id" :index="JSON.stringify(child1)">
              <template slot="title">
                <i class="el-icon-location"/>
                <span>{{ child1.name }}</span>
              </template>
              <!-- 三级菜单没有子菜单 -->
              <el-menu-item v-for="child2 in child1.children" v-if="!child2.children" :key="child2.id" :index="JSON.stringify(child2)">
                <i class="el-icon-menu"/>
                <span slot="title">{{ child2.name }}</span>
              </el-menu-item>
              <!-- 三级菜单有子菜单 -->
              <el-submenu v-for="child2 in child1.children" v-if="child2.children" :key="child2.id" :index="JSON.stringify(child2)">
                <template slot="title">
                  <i class="el-icon-location"/>
                  <span>{{ child2.name }}</span>
                </template>
                <!-- 四级菜单没有子菜单 -->
                <el-menu-item v-for="child3 in child2.children" v-if="!child3.children" :key="child3.id" :index="JSON.stringify(child3)">
                  <i class="el-icon-menu"/>
                  <span slot="title">{{ child3.name }}</span>
                </el-menu-item>
                <!-- 四级菜单有子菜单 -->
                <el-submenu v-for="child3 in child2.children" v-if="child3.children" :key="child3.id" :index="JSON.stringify(child3)">
                  <template slot="title">
                    <i class="el-icon-location"/>
                    <span>{{ child3.name }}</span>
                  </template>
                  <!-- 五级菜单没有子菜单 -->
                  <el-menu-item v-for="child4 in child3.children" v-if="!child4.children" :key="child4.id" :index="JSON.stringify(child4)">
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
            v-model="listQuery.searchKey"
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
            label="导航名称"
            align="center"
            width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="图标"
            width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.icon }}</span>
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
            :current-page="listQuery.currentPage"
            :page-sizes="[10,20,30, 50]"
            :page-size="listQuery.pageSize"
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
              label="应用ID"
              prop="appId">
              <el-input v-model="temp.appId" disabled/>
            </el-form-item>
            <el-form-item
              label="父节点ID"
              prop="parentId">
              <el-input v-model="temp.parentId" disabled/>
            </el-form-item>
            <el-form-item
              label="名称"
              prop="navName">
              <el-input v-model="temp.navName" />
            </el-form-item>
            <el-form-item
              label="优先级"
              prop="priority">
              <el-input v-model="temp.priority" />
            </el-form-item>
            <!--router start -->
            <el-form-item
              label="路由地址"
              prop="linkPath">
              <el-input v-model="temp.linkPath" />
            </el-form-item>
            <el-form-item
              label="路由组件"
              prop="linkComponent">
              <el-input v-model="temp.linkComponent" />
            </el-form-item>
            <el-form-item
              label="路由名称"
              prop="linkName">
              <el-input v-model="temp.linkName" />
            </el-form-item>
            <el-form-item
              label="路由重定向"
              prop="linkRedirect">
              <el-input v-model="temp.linkRedirect" />
            </el-form-item>
            <el-form-item
              label="路由标题"
              prop="linkMetaTitle">
              <el-input v-model="temp.linkMetaTitle" />
            </el-form-item>
            <el-form-item
              label="路由图标"
              prop="linkMetaIcon">
              <el-input v-model="temp.linkMetaIcon" />
            </el-form-item>
            <!--router  end -->
            <el-form-item
              label="应用图标"
              prop="icon">
              <el-input v-model="temp.icon" />
            </el-form-item>
            <el-form-item label="是否可见">
              <el-radio-group v-model="temp.status">
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
  fetchNavTree,
  fetchNavList,
  editNav,
  deleteNav
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
      selectedOptions2: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
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
        appId: '',
        parentId: '',
        searchKey: ''
      },
      temp: {
        id: '',
        parentId: '',
        navName: '',
        appId: '',
        priority: '',
        link: '',
        status: '',
        icon: '',
        linkPath: '',
        linkComponent: '',
        linkRedirect: '',
        linkName: '',
        linkMetaTitle: '',
        linkMetaIcon: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
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
      navData: [],
      defaultActive: ''
    }
  },
  created() {
    this.getNav()
  },
  methods: {
    // 获取区域树 和 获取区域列表
    getNav() {
      this.listLoading = true
      fetchNavTree().then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            // this.navData = response.data.data
            this.navData = this.traverse(response.data.data)
            this.defaultActive = JSON.stringify(this.navData[0])
            this.options = this.traverse(response.data.data)
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
      }).catch(function(error) {
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
        navName: '',
        appId: '',
        priority: '',
        link: '',
        status: '',
        icon: '',
        linkPath: '',
        linkComponent: '',
        linkRedirect: '',
        linkName: '',
        linkMetaTitle: '',
        linkMetaIcon: ''
      }
    },
    handleCreate() {
      // 新建一条信息
      this.resetTemp()
      this.temp.parentId = this.listQuery.parentId
      this.temp.appId = this.listQuery.appId
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate() // 清除表单的校验
      })
    },
    createData() {
      const tempLink = {
        linkPath: this.temp.linkPath,
        linkComponent: this.temp.linkComponent,
        linkRedirect: this.temp.linkRedirect,
        linkName: this.temp.linkName,
        linkMetaTitle: this.temp.linkMetaTitle,
        linkMetaIcon: this.temp.linkMetaIcon
      }
      this.temp.link = JSON.stringify(tempLink)
      console.log(this.temp)
      // 新建 提交确认
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          editNav(this.temp).then((response) => {
            if (response.status === 200) {
              if (response.data.code === 200) {
                // 新建成功后的回调
                const resData = response.data.data
                const unshiftRow = {}
                unshiftRow.id = resData.id
                unshiftRow.parentId = resData.parentId
                unshiftRow.name = resData.navName
                unshiftRow.icon = resData.icon
                unshiftRow.link = resData.link
                unshiftRow.nodeType = ''
                unshiftRow.appGrade = ''
                unshiftRow.appResourceType = ''
                unshiftRow.permission = resData.permission
                this.list.unshift(unshiftRow)
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
      // this.temp = Object.assign({}, row)
      // this.temp = Object.assign({}, {}) // copy obj
      this.resetTemp()
      this.temp.id = row.id
      this.temp.parentId = row.parentId
      this.temp.navName = row.name
      this.temp.appId = this.listQuery.appId
      this.temp.priority = ''
      this.temp.link = row.link
      if (row.link !== '') {
        JSON.parse(row.link).linkPath && (this.temp.linkPath = JSON.parse(row.link).linkPath)
        JSON.parse(row.link).linkComponent && (this.temp.linkComponent = JSON.parse(row.link).linkComponent)
        JSON.parse(row.link).linkRedirect && (this.temp.linkRedirect = JSON.parse(row.link).linkRedirect)
        JSON.parse(row.link).linkName && (this.temp.linkName = JSON.parse(row.link).linkName)
        JSON.parse(row.link).linkMetaTitle && (this.temp.linkMetaTitle = JSON.parse(row.link).linkMetaTitle)
        JSON.parse(row.link).linkMetaIcon && (this.temp.linkMetaIcon = JSON.parse(row.link).linkMetaIcon)
      } else {
        this.temp.linkPath = ''
        this.temp.linkComponent = ''
        this.temp.linkRedirect = ''
        this.temp.linkName = ''
        this.temp.linkMetaTitle = ''
        this.temp.linkMetaIcon = ''
      }
      this.temp.status = ''
      this.temp.icon = row.icon
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // 修改/编辑 确认事件
      const tempLink = {
        linkPath: this.temp.linkPath,
        linkComponent: this.temp.linkComponent,
        linkRedirect: this.temp.linkRedirect,
        linkName: this.temp.linkName,
        linkMetaTitle: this.temp.linkMetaTitle,
        linkMetaIcon: this.temp.linkMetaIcon
      }
      this.temp.link = JSON.stringify(tempLink)
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          editNav(tempData).then((response) => {
            if (response.status === 200) {
              if (response.data.code === 200) {
                const resData = response.data.data
                for (const v of this.list) {
                  // 更新后的值插入原来数据的位置
                  if (v.id === this.temp.id) {
                    const index = this.list.indexOf(v)
                    const tempRow = {}
                    tempRow.id = resData.id
                    tempRow.parentId = resData.parentId
                    tempRow.name = resData.navName
                    tempRow.icon = resData.icon
                    tempRow.link = resData.link
                    tempRow.nodeType = ''
                    tempRow.appGrade = ''
                    tempRow.appResourceType = ''
                    tempRow.permission = resData.permission
                    this.list.splice(index, 1, tempRow)
                    break
                  }
                }
                this.dialogFormVisible = false
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
    handleDelete(row) {
      deleteNav({ id: row.id, appId: this.listQuery.appId }).then((response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            // 在列表中删除 （将当前id传给后台）
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
    },
    handleSelect(key, keyPath) {
      this.listLoading = true
      if (JSON.parse(key).appResourceType === 'TYPE_APPLICATION') {
        this.listQuery.appId = JSON.parse(key).id
        this.listQuery.parentId = '#'
      } else {
        this.listQuery.parentId = JSON.parse(key).id
      }
      // this.listQuery.parentId = JSON.parse(key).id
      console.log(this.listQuery)
      fetchNavList(this.listQuery).then(response => {
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
      this.defaultActive = key
      console.log(JSON.parse(key))
      if (JSON.parse(key).appResourceType === 'TYPE_APPLICATION') {
        this.listQuery.appId = JSON.parse(key).id
        this.listQuery.parentId = '#'
      } else {
        this.listQuery.parentId = JSON.parse(key).id
      }
      this.listLoading = true
      console.log(this.listQuery)
      fetchNavList(this.listQuery).then(response => {
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
      this.defaultActive = key
      console.log(JSON.parse(key))
      if (JSON.parse(key).appResourceType === 'TYPE_APPLICATION') {
        this.listQuery.appId = JSON.parse(key).id
        this.listQuery.parentId = '#'
      } else {
        this.listQuery.parentId = JSON.parse(key).id
      }
      this.listLoading = true
      // this.listQuery.parentId = JSON.parse(key).id
      console.log(this.listQuery)
      fetchNavList(this.listQuery).then(response => {
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
