<template>
  <div class="app-container">
    <el-table v-loading="listLoading"
              :key="tableKey"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%;min-height:500px;">
      <el-table-column label="车牌号码"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memberNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车主姓名"
                       width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车主信息"
                       width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.driverInfo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.driverTelephoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车场名称">
        <template slot-scope="scope">
          <span>{{ scope.row.carParkName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="套餐名称">
        <template slot-scope="scope">
          <span>{{ scope.row.memberTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到期时间">
        <template slot-scope="scope">
          <span>{{ scope.row.effectiveEndTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="有效车数">
        <template slot-scope="scope">
          <span>{{ scope.row.validMemberCount }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page"
                     :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.pageSize"
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
  fetchMonthlyMembersList
} from '@/api/parkManage'
// import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplexTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '入口',
        1: '出口'
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
        page: 1,
        pageSize: 20,
        serviceId: '',
        searchType: 0
      }
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
      this.listQuery.serviceId = this.userInfo.selectCommunity
      fetchMonthlyMembersList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data
            this.total = parseInt(response.data.msg)
            this.listLoading = false
          }
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
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
.filter-container {
  text-align: left;
}
.editor-custom-btn-container {
  top: 0 !important;
}
</style>
