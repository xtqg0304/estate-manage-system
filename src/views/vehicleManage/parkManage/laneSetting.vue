<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.searchType"
                 placeholder="搜索类型"
                 clearable
                 class="filter-item"
                 @change="handleChangeSearchType">
        <el-option v-for="item in searchTypeOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.parkType"
                 placeholder="本地车场类型"
                 clearable
                 class="filter-item"
                 @change="handleChangeParkType">
        <el-option v-for="item in localLaneTypeOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
      </el-select>
    </div>

    <el-table v-loading="listLoading"
              :key="tableKey"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%;min-height:500px;">
      <el-table-column v-if="listQuery.parkType === 1"
                       label="车道ID"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.carRoadId }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="listQuery.parkType === 1"
                       label="车道名称"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.carRoadName }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="listQuery.parkType === 1"
                       label="车道类型"
                       width="“180”"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.carRoadType | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="listQuery.parkType === 1"
                       :label="$t('table.actions')"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.carRoadType === '2'"
                     size="large"
                     type="primary"
                     @click="handleCreateCode(scope.row)">生成二维码
          </el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="listQuery.parkType === 0"
                       label="车道名称"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.carRoadName }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="listQuery.parkType === 0"
                       label="车道类型"
                       width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.carRoadType | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="listQuery.parkType === 0"
                       label="所属车场名称"
                       width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.ownCarparkNoName }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="listQuery.parkType === 0"
                       label="岗亭名称">
        <template slot-scope="scope">
          <span>{{ scope.row.manageComputerName }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  fetchLaneList,
  fetchQrcodePark
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
    },
    typeFilter(status) {
      const statusMap = {
        1: '大车场入口',
        2: '大车场出口',
        3: '小车场入口',
        4: '小车场出口'
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
      searchTypeOptions: [
        {
          label: '车场',
          value: 0
        },
        {
          label: '车道',
          value: 1
        },
        {
          label: '岗亭信息',
          value: 2
        },
        {
          label: '操作员信息',
          value: 3
        }
      ],
      localLaneTypeOptions: [
        {
          label: '星网物联车场',
          value: 0
        },
        {
          label: '腾达智能停车场',
          value: 1
        }
      ],
      listQuery: {
        serviceId: '',
        searchType: 0,
        parkType: 0
      },
      QrcodePark: ''
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
      // this.listQuery.searchType = 0
      fetchLaneList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data
            this.listLoading = false
          }
        }
      })
    },
    handleChangeSearchType(searchType) {
      this.listQuery.searchType = searchType
      this.getList()
    },
    handleChangeParkType(parkType) {
      this.listQuery.parkType = parkType
      this.getList()
    },
    handleCreateCode(row) {
      fetchQrcodePark({ laneId: row.carRoadId, communityId: this.userInfo.selectCommunity }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.QrcodePark = response.data.data
            this.$alert(`<img src="${this.QrcodePark}" >`, '此二维码仅显示一次，请妥善保存', {
              dangerouslyUseHTMLString: true
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
.filter-container {
  text-align: left;
}
.editor-custom-btn-container {
  top: 0 !important;
}
</style>
