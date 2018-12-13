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
      <el-select v-model="listQuery.communityId" placeholder="选择小区" clearable class="filter-item">
        <el-option key="all" label="所有小区" value="all" />
        <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;min-height:500px;">
      <el-table-column label="小区名字" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.communityName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="月份" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payMonth }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总订单数" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电子收费" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.paySum }}</span>
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
  fetchEstatePayMonth
} from '@/api/payManage'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
export default {
  name: 'ComplexTable',
  directives: {
    waves
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
        communityId: 'all',
        beginTime: '',
        endTime: ''
      }
    }
  },
  computed: {
    communityId() {
      const sessionData = sessionStorage.getItem('selectCommunity')
      if (this.$store.state.user.selectCommunity === '' && sessionData) {
        this.$store.commit('SET_SELECTCOMMUNITY', sessionData)// 同步操作
      }
      return this.$store.state.user.selectCommunity
    },
    communityList() {
      const sessionData = JSON.parse(sessionStorage.getItem('communityList'))
      if (this.$store.state.user.communityList.length === 0 && sessionData) {
        this.$store.commit('SET_COMMUNITYLIST', sessionData)// 同步操作
      }
      return this.$store.state.user.communityList
    }
  },
  created() {
    this.getList()
    // this.communityList.unshift({ id: 'all', name: '所有小区' })
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchEstatePayMonth(this.listQuery).then(response => {
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
    handleFilter() {
      console.log(this.listQuery)
      // 搜索数据（默认请求第一页数据）
      this.listQuery.beginTime = this.listQuery.beginTime && parseTime(this.listQuery.beginTime, '{y}-{m}')
      this.listQuery.endTime = this.listQuery.endTime && parseTime(this.listQuery.endTime, '{y}-{m}')
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
