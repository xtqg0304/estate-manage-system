<template>
  <div class="app-container">
    <el-upload ref="upload"
               :http-request="submitUpload"
               :limit="1"
               :auto-upload="false"
               :on-exceed="handleExceed"
               class="upload-property"
               action=""
               multiple>
      <el-button slot="trigger"
                 :disabled="uploadBtn"
                 size="small"
                 type="primary"
                 icon="el-icon-plus">上传文件</el-button>
      <el-button :disabled="uploadBtn"
                 style="margin-left: 10px;"
                 size="small"
                 type="success"
                 icon="el-icon-upload"
                 @click="submitAssess">导入</el-button>
    </el-upload>
    <div class="filter-container">
      <el-button v-waves
                 class="filter-item"
                 type="primary"
                 @click="handleDownload"> 模版下载 </el-button>
      <!-- 根据楼栋分别获取房产信息 -->
      <el-cascader :options="buildings"
                   v-model="listQuery.searchEstate"
                   placeholder="房产名称"
                   class="filter-item"
                   @active-item-change="handleChange" />
      <el-select v-model="listQuery.billStatus"
                 placeholder="账单状态"
                 clearable
                 class="filter-item">
        <el-option v-for="item in statusbillOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
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
      <el-table-column :label="$t('table.propertyname')"
                       min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.estateName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ownername')"
                       width="110px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.houseHoldName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ownerphone')"
                       width="110px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.houseHoldPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.monthofpay')"
                       width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.payMonth }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.projectofpay')"
                       align="center"
                       width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.payCategory | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.feesofpay')"
                       align="center"
                       width="300">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.payAmount"
                      class="edit-input"
                      size="small" />
            <el-button class="cancel-btn"
                       size="small"
                       icon="el-icon-refresh"
                       type="warning"
                       @click="cancelEdit(scope.row)">cancel</el-button>
            <el-button type="success"
                       size="small"
                       icon="el-icon-circle-check-outline"
                       @click="confirmEdit(scope.row)">Ok</el-button>
          </template>
          <span v-else>
            {{ scope.row.payAmount }}
            <el-button v-if="scope.row.editButton"
                       type="primary"
                       size="small"
                       icon="el-icon-edit"
                       @click="scope.row.edit=!scope.row.edit">Edit</el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.statusbill')"
                       class-name="status-col"
                       width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.billStatus | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')"
                       align="center"
                       width="230"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.editButton"
                     size="mini"
                     type="primary"
                     @click="handlePayEstate(scope.row)">缴费
          </el-button>
          <el-button v-if="scope.row.editButton"
                     size="mini"
                     type="success"
                     @click="handleModifyStatus(scope.row, 4)">销账
          </el-button>
          <el-button v-if="scope.row.editButton"
                     size="mini"
                     @click="handleModifyStatus(scope.row, 2)">作废
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
  </div>
</template>

<script>
import {
  fetchBillList,
  editBillAmount,
  editBillStatus,
  importBill,
  cashPay
} from '@/api/payManage'
import waves from '@/directive/waves' // 水波纹指令
import { estateSelectLazyLoadMixin } from '@/mixin/estateSelect'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '已缴',
        2: '作废',
        3: '未缴',
        4: '销账'
      }
      return statusMap[status]
    },
    typeFilter(status) {
      const statusMap = {
        1: '水费',
        2: '电费',
        3: '物业费',
        4: '其他费用'
      }
      return statusMap[status]
    }
  },
  mixins: [estateSelectLazyLoadMixin],
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
        communityId: '',
        estateId: '',
        searchEstate: [],
        billStatus: '',
        searchKey: ''
      },
      statusbillOptions: [
        {
          label: '已缴',
          value: 1
        },
        {
          label: '作废',
          value: 2
        },
        {
          label: '未缴',
          value: 3
        }
      ],
      buildings: [],
      uploadBtn: false
    }
  },
  computed: {
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
    this.getBuilding()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.communityId = this.communityId
      fetchBillList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            const items = response.data.data.qryList
            this.list = items.map(v => {
              if (v.billStatus === 3) {
                this.$set(v, 'editButton', true)
                this.$set(v, 'edit', false)
                v.originalPayAmount = v.payAmount
              }
              return v
            })
            // this.list = response.data.data.qryList
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
      console.log(this.listQuery)
      // 搜索数据（默认请求第一页数据）
      this.listQuery.estateId = this.listQuery.searchEstate[1]
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
    handleModifyStatus(row, status) {
      editBillStatus({ id: row.id, billStatus: status }).then((response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            row.billStatus = status
            for (const v of this.list) {
              // 更新后的值插入原来数据的位置
              if (v.id === row.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, row)
                break
              }
            }
            row.editButton = false
            this.$message({
              message: '操作成功',
              type: 'success'
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
    cancelEdit(row) {
      row.payAmount = row.originalPayAmount
      row.edit = false
      this.$message({
        message: '缴费金额未改变',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      editBillAmount({ id: row.id, payAmount: row.payAmount }).then((response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            row.edit = false
            row.originalPayAmount = row.payAmount
            this.$message({
              message: '金额改变成功',
              type: 'success'
            })
            // this.$notify({
            //   title: '成功',
            //   message: '更新成功',
            //   type: 'success',
            //   duration: 2000
            // })
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
    /* 下载账单导入模板功能 */
    handleDownload() {
      const url = `http://${window.location.host}/api/payment/property/export/billModule?communityId=${this.communityId}`
      window.location.href = url
    },
    /* 限制只能上传一个文件 */
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    /* 导入数据 */
    submitUpload(content) { // 自定义的上传方法
      const _this = this
      _this.uploadBtn = true
      const formdata = new FormData()
      formdata.append('file', content.file)
      formdata.append('communityId', this.communityId) // 获取小区id
      importBill(formdata)
        .then(response => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              _this.uploadBtn = false
              this.$notify({
                title: '成功',
                message: '导入成功',
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
          }
        })
        .catch(function(error) {
          _this.uploadBtn = false
          console.log(error)
        })
    },
    submitAssess() {
      this.$refs.upload.submit()
    },
    handlePayEstate(row) {
      cashPay({ id: row.id }).then((response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            row.billStatus = response.data.data.billStatus
            for (const v of this.list) {
              // 更新后的值插入原来数据的位置
              if (v.id === row.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, row)
                break
              }
            }
            row.editButton = false
            this.$message({
              message: '缴费成功',
              type: 'success'
            })
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
.edit-input {
  width: 100px;
}
</style>
