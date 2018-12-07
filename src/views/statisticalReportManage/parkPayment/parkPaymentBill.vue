<template>
  <div class="app-container">
    <div class="filter-container">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
      <el-cascader :options="options" v-model="listQuery.selectedroom" :placeholder="$t('table.propertyname')" class="filter-item" expand-trigger="hover" />
      <el-select v-model="listQuery.statusBill" placeholder="账单状态" clearable class="filter-item">
        <el-option v-for="item in statusbillOptions" :key="item" :label="$t('table.'+item)" :value="item" />
      </el-select>
      <el-input v-model="listQuery.keyword" placeholder="关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
          <!-- <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
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
      <el-table-column :label="$t('table.monthofpay')" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.monthofpay }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.projectofpay')" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.projectofpay }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.feesofpay')" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.feesofpay }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('table.status')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('table.statusbill')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.statusbill | statusFilter">{{ $t('table.'+scope.row.statusbill) }}</el-tag>
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
} from '@/api/estatePaybill'
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
// import { parseTime } from '@/utils'

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
  components: { Tinymce },
  data() {
    return {
      options: [
        {
          value: 'B1',
          label: 'B1座',
          children: [
            {
              value: '01',
              label: '01单元',
              children: [{
                value: '0101',
                label: '0101'
              },
              {
                value: '0102',
                label: '0102'
              },
              {
                value: '0103',
                label: '0103'
              },
              {
                value: '0104',
                label: '0104'
              }
              ]
            },
            {
              value: '02',
              label: '02单元',
              children: [{
                value: '0201',
                label: '0201'
              }, {
                value: '0202',
                label: '0202'
              }]
            }
          ]
        },
        {
          value: 'B2',
          label: 'B2座',
          children: [
            {
              value: '01',
              label: '01单元',
              children: [{
                value: '0101',
                label: '0101'
              },
              {
                value: '0102',
                label: '0102'
              },
              {
                value: '0103',
                label: '0103'
              },
              {
                value: '0104',
                label: '0104'
              }
              ]
            },
            {
              value: '02',
              label: '02单元',
              children: [{
                value: '0201',
                label: '0201'
              }, {
                value: '0202',
                label: '0202'
              }]
            }
          ]
        },
        {
          value: 'C1',
          label: 'C1座',
          children: [
            {
              value: '01',
              label: '01单元',
              children: [{
                value: '0101',
                label: '0101'
              },
              {
                value: '0102',
                label: '0102'
              },
              {
                value: '0103',
                label: '0103'
              },
              {
                value: '0104',
                label: '0104'
              }
              ]
            },
            {
              value: '02',
              label: '02单元',
              children: [{
                value: '0201',
                label: '0201'
              }, {
                value: '0202',
                label: '0202'
              }]
            }
          ]
        },
        {
          value: 'D1',
          label: 'D1座',
          children: [
            {
              value: '01',
              label: '01单元',
              children: [{
                value: '0101',
                label: '0101'
              },
              {
                value: '0102',
                label: '0102'
              },
              {
                value: '0103',
                label: '0103'
              },
              {
                value: '0104',
                label: '0104'
              }
              ]
            },
            {
              value: '02',
              label: '02单元',
              children: [{
                value: '0201',
                label: '0201'
              }, {
                value: '0202',
                label: '0202'
              }]
            }
          ]
        }

      ],
      tableData: [],
      tableHeader: [],
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        statusBill: undefined,
        keyword: undefined,
        selectedroom: undefined
      },
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      statusbillOptions: ['payment', 'cancelaccount', 'invalid', 'nopay'],
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
