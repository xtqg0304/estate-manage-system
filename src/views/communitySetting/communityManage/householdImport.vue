<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span> 选择excel文件导入：
          <el-upload
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :http-request="submitUpload"
            :limit="1"
            :auto-upload="false"
            :on-exceed="handleExceed"
            class="upload-property"
            action=""
            multiple>
            <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" icon="el-icon-upload" @click="submitAssess">房产导入</el-button>
          </el-upload>
        </span>
      </div>
      <div class="component-item">
        <p><strong>使用说明: </strong> 请参照下图说明填写Excel模板</p>
        <p><img src="../../../assets/images/propertyImport.png" ></p>
        <p>
          <el-button v-waves type="primary" @click="handleDownload"> 模版下载 </el-button>
          <el-button v-waves type="default"> 模板生成 </el-button>
          <span>如有更新需重新生成模版,上次生成时间：2018-11-04 07:38:36</span>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  exportModule,
  importHousehold
} from '@/api/houseHold'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
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
    /* 下载小区模板功能 */
    handleDownload() {
      const formdata = new FormData()
      formdata.append('communityId', '1111') // 获取小区id
      exportModule(formdata).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.$notify({
              title: '成功',
              message: '下载成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify.error({
              title: '失败',
              message: response.data.msg,
              duration: 2000
            })
          }
        }
      })
    },
    /* 限制只能上传一个文件 */
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    /* 导入数据 */
    submitUpload(content) { // 自定义的上传方法
      const formdata = new FormData()
      formdata.append('file', content.file)
      formdata.append('communityId', '1111') // 获取小区id
      importHousehold(formdata)
        .then(response => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              this.$notify({
                title: '成功',
                message: '导入成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify.error({
                title: '失败',
                message: response.data.msg,
                duration: 2000
              })
            }
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    submitAssess() {
      this.$refs.upload.submit()
    }
  }
}
</script>
<style>
.upload-property{
  display: inline-flex;
}
</style>
