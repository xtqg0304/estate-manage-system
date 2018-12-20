<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate">{{ $t('table.add') }}</el-button>
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
        label="车场名称"
        width="150px"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.carparkName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="车位总数"
        width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.parkingLotNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="在线状态"
        width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.status | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="详细地址"
        width="120px"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="车场编码"
        align="center"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.carparkKey }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleLink(scope.row)">配置</el-button>
          <el-button
            type="success"
            size="mini"
            @click="handleDetail(scope.row)">{{ $t('table.detail') }}</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
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
          label="车场ID"
          prop="id">
          {{ temp.id }}
        </el-form-item>
        <el-form-item
          label="车场编码"
          prop="carparkKey ">
          <el-input v-model="temp.carparkKey " />
        </el-form-item>
        <el-form-item
          label="隶属小区"
          prop="selectCommunityName">
          {{ userInfo.selectCommunityName }}
        </el-form-item>
        <el-form-item
          label="车场名称"
          prop="carparkName">
          <el-input v-model="temp.carparkName" />
        </el-form-item>
        <el-form-item
          label="车场总数"
          prop="parkingLotNum">
          <el-input v-model="temp.parkingLotNum" />
        </el-form-item>
        <el-form-item
          label="联系电话"
          prop="contactNumber">
          <el-input v-model="temp.contactNumber" />
        </el-form-item>
        <el-form-item
          label="经纬度"
          prop="remarks">
          <el-col :span="11">
            <el-input v-model="temp.lon" />
          </el-col>
          <el-col :span="2" class="line" style="text-align:center">-</el-col>
          <el-col :span="11">
            <el-input v-model="temp.lat" />
          </el-col>
        </el-form-item>
        <el-form-item
          label="详细地址"
          prop="address">
          <el-input v-model="temp.address" type="textarea" />
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
      :visible.sync="dialogDetailVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempDetail"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;">
        <el-form-item
          label="车场ID"
          prop="id">
          {{ tempDetail.id }}
        </el-form-item>
        <el-form-item
          label="车场编码"
          prop="carparkKey ">
          {{ tempDetail.carparkKey }}
        </el-form-item>
        <el-form-item
          label="隶属小区"
          prop="selectCommunityName">
          {{ userInfo.selectCommunityName }}
        </el-form-item>
        <el-form-item
          label="车场名称"
          prop="carparkName ">
          {{ tempDetail.carparkName }}
        </el-form-item>
        <el-form-item
          label="车场总数"
          prop="parkingLotNum">
          {{ tempDetail.parkingLotNum }}
        </el-form-item>
        <el-form-item
          label="联系电话"
          prop="contactNumber">
          {{ tempDetail.contactNumber }}
        </el-form-item>
        <el-form-item
          label="经纬度"
          prop="remarks">
          <el-col :span="11">
            {{ tempDetail.lon }}
          </el-col>
          <el-col :span="2" class="line" style="text-align:center">-</el-col>
          <el-col :span="11">
            {{ tempDetail.lat }}
          </el-col>
        </el-form-item>
        <el-form-item
          label="详细地址"
          prop="address">
          {{ tempDetail.address }}
        </el-form-item>
        <el-form-item
          label="车场密钥"
          prop="address"
          style="word-wrap: break-word;">
          {{ tempDetail.secretKey }}
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogDetailVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogDetailVisible = false">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  fetchList,
  addCarpark,
  editCarpark,
  deleteCarpark,
  getKey
  // getCarparkDetail
} from '@/api/parkManage'
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
// import { parseTime } from '@/utils'
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
        0: '离线',
        1: '在线'
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
      temp: {
        id: undefined,
        carparkName: '',
        servicparkingLotNum: '',
        lon: '',
        lat: '',
        communityId: '',
        contactNumber: '',
        address: '',
        carparkKey: '',
        status: ''

      },
      dialogFormVisible: false,
      dialogDetailVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      rules: {
        carparkName: [
          { required: true, message: '车场名称不能为空', trigger: 'blur' }
        ],
        parkingLotNum: [
          { required: true, message: '车位总数不能为空', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ]
      },
      tempDetail: {}
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
      const formdata = new FormData()
      formdata.append('communityId', this.userInfo.selectCommunity)
      fetchList(formdata).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data
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
    resetTemp() {
      // 重新初始化新建对象的默认值
      this.temp = {
        id: undefined,
        carparkName: '',
        servicparkingLotNum: '',
        lon: '',
        lat: '',
        communityId: '',
        contactNumber: '',
        address: '',
        carparkKey: '',
        status: ''
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
          this.temp.communityId = this.userInfo.selectCommunity
          addCarpark(this.temp).then((response) => {
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
          editCarpark(tempData).then((response) => {
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
        // 在列表中删除 （将当前id传给后台）
        const formdata = new FormData()
        formdata.append('carparkId', row.id)
        deleteCarpark(formdata).then((response) => {
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
    },
    handleDetail(row) {
      this.tempDetail = Object.assign({}, row)
      const formdata = new FormData()
      formdata.append('carparkKey', row.carparkKey)
      getKey(formdata).then((response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.tempDetail.secretKey = response.data.data
            this.dialogStatus = 'detail'
            this.dialogDetailVisible = true
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
    handleLink(row) {
      window.location.href = `http://${row.macAddress}.tdzntech.com:9898`
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
.filter-container{
  text-align: left;
}
.editor-custom-btn-container {
  top: 0 !important;
}
</style>
