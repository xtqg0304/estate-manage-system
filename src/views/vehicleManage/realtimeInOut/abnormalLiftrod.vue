<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.beginTime"
        :picker-options="timePickerOptions"
        class="filter-item-rangedate"
        type="datetime"
        placeholder="开始时间"
        align="right"/>
      <el-date-picker
        v-model="listQuery.endTime"
        :picker-options="timePickerOptions"
        class="filter-item-rangedate"
        type="datetime"
        placeholder="结束时间"
        align="right"/>
      <el-select v-model="listQuery.payType" placeholder="车场" clearable class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.payType" placeholder="收费员" clearable class="filter-item">
        <el-option v-for="item in cashOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.searchKey" placeholder="关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;min-height:500px;">
      <el-table-column label="车场" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.outTradeNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进出时间" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estateName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进出通道" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.houseHoldName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收费员" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常抬杆类型" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.payAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常抬杆原因" class-name="status-col" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.payStatus | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleShowDetail(scope.row)">{{ $t('table.detail') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDetailVisible">
      <el-table :data="userList" border fit highlight-current-row style="width: 100%">
        <el-table-column label="缴费类目" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.payCategory | typeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="缴费金额" prop="payAmount" />
        <el-table-column label="缴费时间" prop="payMonth" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetailVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchOrderList,
  fetchOrderDetail
} from '@/api/payManage'
import waves from '@/directive/waves' // 水波纹指令
// import { parseTime } from '@/utils'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    payFilter(status) {
      const statusMap = {
        1: '微信支付',
        2: '支付宝'
      }
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        1: '支付成功',
        2: '支付超时',
        3: '等待支付'
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
        beginTime: '',
        endTime: '',
        payType: '',
        payStatus: '',
        searchKey: ''
      },
      temp: {},
      statusOptions: [
        {
          label: '测试车场1',
          value: 1
        },
        {
          label: '测试车场2',
          value: 2
        }
      ],
      cashOptions: [
        {
          label: '仟泰1',
          value: 1
        },
        {
          label: '仟泰2',
          value: 2
        }
      ],
      dialogDetailVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建',
        detail: '详情'
      },
      userList: []
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
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.communityId = this.communityId
      fetchOrderList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            // this.list = response.data.data.qryList
            // this.total = response.data.totalCount
            this.list = []
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
    handleShowDetail(row) {
      fetchOrderDetail({ outTradeNo: row.outTradeNo }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            // 显示详情事件
            this.temp = Object.assign({}, row) // copy obj
            this.userList = response.data.data
            debugger
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
.edit-input{
  width:100px;
}
</style>
