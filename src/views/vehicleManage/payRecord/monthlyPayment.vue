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
      <el-select v-model="listQuery.payType" placeholder="支付类型" clearable class="filter-item">
        <el-option v-for="item in payTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.transactionMark " placeholder="备注信息" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;min-height:500px;">
      <el-table-column label="订单编号" align="center" width="280">
        <template slot-scope="scope">
          <span>{{ scope.row.transactionId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付类型" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际金额" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.realFee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总金额" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.totalFee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠金额" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.discountFee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠信息" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.discountType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单备注" >
        <template slot-scope="scope">
          <span>{{ scope.row.transactionMark }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import {
  fetchChargeReportInfo
} from '@/api/parkPayData'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        2: '月卡现金支付',
        4: '月卡微信支付',
        6: '月卡支付宝支付'
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
        beginTime: '',
        endTime: '',
        communityId: '',
        searchType: 0,
        payType: '',
        transactionMark: ''
      },
      payTypeOptions: [
        {
          label: '月卡现金支付',
          value: 2
        },
        {
          label: '月卡微信支付',
          value: 4
        },
        {
          label: '月卡支付宝支付',
          value: 6
        }
      ]
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
      fetchChargeReportInfo(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.chargeDetailElementList
            this.total = response.data.data.totalCount
            this.listLoading = false
          }
        }
      })
    },
    handleFilter() {
      this.listQuery.beginTime = this.listQuery.beginTime && parseTime(this.listQuery.beginTime)
      this.listQuery.endTime = this.listQuery.endTime && parseTime(this.listQuery.endTime)
      console.log(this.listQuery)
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
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
