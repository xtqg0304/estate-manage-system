<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
      <el-select v-model="listQuery.statusProperty" placeholder="请选择房产类型" clearable class="filter-item">
        <el-option v-for="item in statuspropertyOptions" :key="item" :label="$t('table.'+item)" :value="item" />
      </el-select>
      <el-input v-model="listQuery.keyword" placeholder="关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;min-height:500px;">
      <el-table-column :label="$t('table.building')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.building }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.floor')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floor }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.unit')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.roomNumber')" width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.roomNumber }}</span>
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
  fetchList
} from '@/api/propertyInfo'
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: { Tinymce, UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        statusProperty: undefined,
        keyword: undefined
      },
      statuspropertyOptions: ['house', 'shops', 'shop', 'other'],
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      console.log(this.listQuery)
      // 搜索数据（默认请求第一页数据）
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      // 每页显示多少条数据
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      // 显示第几页的数据
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      // 改变当前按钮的状态
      // console.log(row)
      // console.log(status)
      // 请求后台接口将状态传给后台，如果成功，前端修改数据
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handleDownload() {
      // 导出数据
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = [
          'timestamp',
          'title',
          'type',
          'importance',
          'status'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
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
</style>
