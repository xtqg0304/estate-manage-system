<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.outTimeBegin"
        :picker-options="timePickerOptions"
        class="filter-item-rangedate"
        type="datetime"
        placeholder="开始时间"
        align="right"/>
      <el-date-picker
        v-model="listQuery.outTimeEnd"
        :picker-options="timePickerOptions"
        class="filter-item-rangedate"
        type="datetime"
        placeholder="结束时间"
        align="right"/>
      <!-- <el-select v-model="listQuery.carparkId" placeholder="车场ID" clearable class="filter-item">
        <el-option v-for="item in parkListOptions" :key="item.carparkId" :label="item.carparkName" :value="item.carparkId" />
      </el-select> -->
      <!-- <el-select v-model="listQuery.carRoadId" placeholder="车道ID" clearable class="filter-item">
        <el-option v-for="item in laneListOptions" :key="item.carRoadId" :label="item.carRoadName" :value="item.carRoadId" />
      </el-select>
      <el-select v-model="listQuery.carType" placeholder="车场类型" clearable class="filter-item">
        <el-option v-for="item in carTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select> -->
      <el-input v-model="listQuery.operatorName" placeholder="操作员姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;min-height:500px;">
      <el-table-column label="车道名称" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.roadName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="岗亭名称" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.postName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作员姓名" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.operatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开闸时间" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开闸说明" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.abnormalReason }}</span>
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
  fetchAbnormalLiftList
} from '@/api/parkPayData'
import {
  fetchCommunityParkList,
  fetchLaneList
} from '@/api/parkManage'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    inoutStatusFilter(status) {
      const statusMap = {
        0: '自动放行',
        1: '手动放行',
        2: '禁止入场',
        3: '离线数据'
      }
      return statusMap[status]
    },
    carNoColorFilter(status) {
      const statusMap = {
        0: '未知',
        1: '蓝底白字',
        2: '黄底黑字',
        3: '白底黑字',
        4: '黑底白字',
        5: '绿底白字',
        6: '新能源车'
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
        outTimeBegin: '',
        outTimeEnd: '',
        operatorName: '',
        communityId: ''
      },
      carTypeOptions: [
        {
          label: '临时车',
          value: '临时车'
        },
        {
          label: '月租车',
          value: '月租车'
        },
        {
          label: '预约车',
          value: '预约车'
        },
        {
          label: '免费车',
          value: '免费车'
        },
        {
          label: '黑名单车',
          value: '黑名单车'
        },
        {
          label: '包次车',
          value: '包次车'
        }
      ],
      parkListOptions: [],
      laneListOptions: []
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
    this.getParkList()
    this.getLaneList()
    this.getList()
  },
  methods: {
    getParkList() {
      fetchCommunityParkList({ serviceId: this.communityId, searchType: 0 }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.parkListOptions = response.data.data
          }
        }
      })
    },
    getLaneList() {
      fetchLaneList({ serviceId: this.communityId, searchType: 0 }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.laneListOptions = response.data.data
          }
        }
      })
    },
    getList() {
      this.listLoading = true
      this.listQuery.communityId = this.communityId
      fetchAbnormalLiftList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data.abnormalLiftElementList
            this.total = response.data.data.totalCount
            this.listLoading = false
          }
        }
      })
    },
    handleFilter() {
      this.listQuery.outTimeBegin = this.listQuery.outTimeBegin && parseTime(this.listQuery.outTimeBegin)
      this.listQuery.outTimeEnd = this.listQuery.outTimeEnd && parseTime(this.listQuery.outTimeEnd)
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
