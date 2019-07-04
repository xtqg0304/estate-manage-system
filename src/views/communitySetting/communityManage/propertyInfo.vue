<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="el-icon-edit"
                 @click="handleCreate">新增楼栋</el-button>
      <el-select v-model="listQuery.estateType"
                 clearable
                 placeholder="请选择房产类型"
                 class="filter-item">
        <el-option v-for="item in statuspropertyOptions"
                   :key="item.name"
                   :label="item.value"
                   :value="item.name" />
      </el-select>
      <el-input v-model="listQuery.searchKey"
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
      <el-table-column :label="$t('table.building')"
                       width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.building }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.floor')"
                       width="180px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floor }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.unit')"
                       width="180px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.roomNumber')"
                       width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.room }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini"
                     type="success"
                     @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.currentPage"
                     :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.pageSize"
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
        <el-form-item label="房产类型"
                      prop="estateType">
          <el-select v-model="temp.estateType"
                     clearable
                     class="filter-item"
                     placeholder="请选择类型"
                     style="width:100%;">
            <el-option v-for="item in statuspropertyOptions"
                       :key="item.name"
                       :label="item.value"
                       :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="楼栋名称"
                      prop="building">
          <el-input v-model="temp.building" />
        </el-form-item>
        <el-form-item label="楼层"
                      prop="floor">
          <el-input v-model="temp.floor" />
        </el-form-item>
        <el-form-item label="单元"
                      prop="unit">
          <el-input v-model="temp.unit" />
        </el-form-item>
        <el-form-item label="房间号"
                      prop="room">
          <el-input v-model="temp.room" />
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  editEstate,
  deleteEstate,
  fetchEstateTypeList
} from '@/api/property'
import waves from '@/directive/waves' // 水波纹指令
import { mapGetters } from 'vuex'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        statusProperty: undefined,
        communityId: '',
        searchKey: '',
        estateType: ''
      },
      statuspropertyOptions: [],
      downloadLoading: false,
      temp: {
        id: '',
        communityId: '',
        serviceName: '',
        communityCode: '',
        communityName: '',
        estateType: '',
        building: '',
        unit: '',
        floor: '',
        room: '',
        propertyFeePrice: '',
        waterFeePrice: '',
        otherFeePrice: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      rules: {
        estateType: [
          { required: true, message: '房产类型不能为空', trigger: 'change' }
        ],
        building: [
          { required: true, message: '楼栋名称不能为空', trigger: 'blur' }
        ],
        floor: [
          { required: true, message: '楼层不能为空', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '单元不能为空', trigger: 'blur' }
        ],
        room: [
          { required: true, message: '房间号不能为空', trigger: 'blur' }
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
    },
    selectCommunityName() {
      const sessionData = sessionStorage.getItem('selectCommunityName')
      if (this.$store.getters.selectCommunityName === '' && sessionData) {
        this.$store.commit('SET_SELECTCOMMUNITYNAME', sessionData)// 同步操作
      }
      return this.$store.getters.selectCommunityName
    }
  },
  created() {
    this.getList()
    this.getTypeList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.communityId = this.communityId
      fetchList(this.listQuery).then(response => {
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
    },
    getTypeList() {
      fetchEstateTypeList().then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.statuspropertyOptions = response.data.data
          }
        }
      })
    },
    handleFilter() {
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
        communityId: '',
        serviceName: '',
        communityCode: '',
        communityName: '',
        estateType: '',
        building: '',
        unit: '',
        floor: '',
        room: '',
        propertyFeePrice: '',
        waterFeePrice: '',
        otherFeePrice: ''
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
          this.temp.communityId = this.communityId
          this.temp.communityCode = this.communityId
          this.temp.communityName = this.selectCommunityName
          editEstate(this.temp).then((response) => {
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
          editEstate(tempData).then((response) => {
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEstate({ id: row.id }).then((response) => {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // 在列表中删除 （将当前id传给后台）
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
