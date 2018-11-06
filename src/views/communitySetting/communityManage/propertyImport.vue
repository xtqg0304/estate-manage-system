<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span> 选择excel文件导入：
          <!-- <el-button v-waves type="primary" icon="el-icon-upload"> 房产导入 </el-button> -->
          <upload-excel-component v-waves :on-success="handleSuccess" :before-upload="beforeUpload" />
        </span>
      </div>
      <div class="component-item">
        <p><strong>使用说明: </strong> 请参照下图说明填写Excel模板</p>
        <p><img src="../../../assets/images/propertyImport.png" /></p>
        <p>
          <el-button v-waves type="primary"> 模版下载 </el-button>
          <el-button v-waves type="default"> 模板生成 </el-button>
          <span>如有更新需重新生成模版,上次生成时间：2018-11-04 07:38:36</span>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  fetchList
} from '@/api/estatePaybill'
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
      tableKey: 0
    }
  },
  created() {
  },
  methods: {
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
