<template>
  <div class="app-container">
    <div class="filter-container">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
      <el-date-picker v-model="listQuery.starttoendimestamp" :picker-options="pickerOptions" :range-separator="$t('table.to')" :start-placeholder="$t('table.startdate')" :end-placeholder="$t('table.enddate')" class="filter-item-rangedate" type="daterange" />
      <el-select v-model="listQuery.statusPayment" :placeholder="$t('table.statuspayment')" clearable class="filter-item">
        <el-option v-for="item in statuspaymentOptions" :key="item" :label="$t('table.'+item)" :value="item" />
      </el-select>
      <el-select v-model="listQuery.categoryPayment" :placeholder="$t('table.categorypayment')" clearable class="filter-item">
        <el-option v-for="item in categorypaymentOptions" :key="item" :label="$t('table.'+item)" :value="item" />
      </el-select>
      <el-input v-model="listQuery.keyword" :placeholder="$t('table.keyword')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;min-height:500px;">
      <el-table-column :label="$t('table.id')" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.propertyname')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.propertyname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ownername')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ownername }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.ownerphone')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ownerphone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.feesofpay')" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.feesofpay }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.categorypayment')" align="center" width="95">
        <template slot-scope="scope">
          <el-tag :type="scope.row.categorypayment | statusFilter">{{ $t('table.'+scope.row.categorypayment) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.statepayment')" align="center" width="95">
        <template slot-scope="scope">
          <el-tag :type="scope.row.statepayment | statusFilter">{{ $t('table.'+scope.row.statepayment) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.statuspayment')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.statuspayment | statusFilter">{{ $t('table.'+scope.row.statuspayment) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">{{ $t('table.publish') }}
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{ $t('table.draft') }}
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
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
} from '@/api/estatePaydetail'
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: { Tinymce, UploadExcelComponent },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
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
        page: 1,
        limit: 20,
        statusPayment: undefined,
        keyword: undefined,
        starttoendimestamp: undefined
      },
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      statuspaymentOptions: ['cash', 'alipay', 'wechat', 'unionpay'],
      categorypaymentOptions: ['chargeforwater', 'chargeforelectric', 'chargeforestate', 'chargeforpublic', 'chargeforpark'],
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
    resetTemp() {
      // 重新初始化新建对象的默认值
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleDelete(row) {
      // 在列表中删除 （将当前id传给后台）
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
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
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      // this.$notify({
      //   title: '成功',
      //   message: '导入成功',
      //   type: 'success',
      //   duration: 2000
      // })
      this.tableData = results
      this.tableHeader = header
      console.log(this.tableData)
      console.log(header)
      // 将数据传给后台，后台存入数据库成功，则重新获取数据列表
      // this.list = results
      // this.total = results.length
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
</style>
