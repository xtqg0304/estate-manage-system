<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:500px;">
      <el-table-column
        label="岗亭Ip"
        width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.postComputerIp }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="岗亭名称">
        <template slot-scope="scope">
          <span>{{ scope.row.postComputerName }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import {
  fetchSentryboxList
} from '@/api/parkManage'
// import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplexTable',
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true
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
      fetchSentryboxList({ serviceId: this.userInfo.selectCommunity, searchType: 0 }).then(response => {
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
