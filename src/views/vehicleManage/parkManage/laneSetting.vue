<template>
  <div class="app-container">
    <el-table v-loading="listLoading"
              :key="tableKey"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%;min-height:500px;">
      <el-table-column label="车道名称"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.carRoadName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车道类型"
                       width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.parkType === 0">{{ scope.row.carRoadType | statusFilter }}</span>
          <span v-else>{{ scope.row.carRoadType | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属车场名称"
                       width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.ownCarparkNoName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="岗亭名称"
                       width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.manageComputerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本地车场类型"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parkType | parkTypefiter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')"
                       align="center"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.parkType === 1&&scope.row.carRoadType === '2'"
                     size="large"
                     type="primary"
                     @click="handleCreateCode(scope.row)">生成二维码
          </el-button>
          <el-button v-if="scope.row.parkType === 1"
                     size="large"
                     type="primary"
                     @click="handleOpen(scope.row)">远程开闸
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  fetchLaneList,
  fetchQrcodePark,
  openGateRemote
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
    },
    parkTypefiter(status) {
      const statusMap = {
        0: '星网物联停车场',
        1: '智能腾达停车场'
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
        serviceId: ''
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
      fetchLaneList(this.listQuery).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.list = response.data.data
            this.listLoading = false
          }
        }
      })
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
    },
    handleOpen(row) {
      openGateRemote({ channelID: row.carRoadId, serviceId: this.userInfo.selectCommunity, searchType: this.listQuery.searchType, parkType: this.listQuery.parkType }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.$notify({
              title: '成功',
              message: '开闸成功',
              type: 'success',
              duration: 2000
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
