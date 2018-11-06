<template>
  <div class="app-container">
    <div class="filter-container">
      <span>{{ tableTitle }}</span>
    </div>
    <el-table v-loading="loading" :data="tableData" :header-cell-style="{background:'#304156',padding:'3px 0',borderBottom:'0'}" :cell-style="{background:'#1e2c47',padding:'3px 0',border:'0',fontSize:'12px'}" stripe style="width: 100%">
      <el-table-column v-for="item in formThead" :key="item" :label="item" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row[item] }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  props: {
    tabledata: {
      type: Object,
      default: function() {}
    }
  },
  data() {
    return {
      tableData: [],
      formThead: [],
      tableTitle: '',
      loading: true,
      dataEmpty: true
    }
  },
  watch: {
    tabledata(oldValue, newValue) {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      if (this.tabledata) {
        this.formThead = this.tabledata.formThead
        this.tableTitle = this.tabledata.tableTitle
        this.tableData = this.tabledata.tableData.length ? this.tabledata.tableData : this.tableData
        this.dataEmpty = !this.tableData.length
        this.loading = false
      }
    }
  }
}
</script>
<style scoped>
.app-container {
  padding: 0;
}
.filter-container {
  padding: 5px;
}
.filter-container span {
  color: #bfcbd9;
}
/*重置table样式*/
.el-table {
  width: 100%;
  background: transparent;
}
div.el-table::before {
  height: 0 !important;
}
.el-loading-mask{
  background: #162238;
}
</style>
