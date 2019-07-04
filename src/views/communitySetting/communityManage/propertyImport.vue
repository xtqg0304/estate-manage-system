<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span> 选择excel文件导入：
          <el-upload ref="upload"
                     :http-request="submitUpload"
                     :limit="1"
                     :auto-upload="false"
                     :on-exceed="handleExceed"
                     class="upload-property"
                     action=""
                     multiple>
            <el-button slot="trigger"
                       :disabled="uploadBtn"
                       size="small"
                       type="primary"
                       icon="el-icon-plus">上传文件</el-button>
            <el-button :disabled="uploadBtn"
                       :icon="iconUpload"
                       style="margin-left: 10px;"
                       size="small"
                       type="success"
                       @click="submitAssess">房产导入</el-button>
          </el-upload>
        </span>
      </div>
      <div class="component-item">
        <p><strong>使用说明: </strong> 请参照下图说明填写Excel模板</p>
        <p><img src="../../../assets/images/propertyImport.png"></p>
        <p>
          <el-button v-waves
                     type="primary"
                     @click="handleDownload"> 模版下载 </el-button>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  importEstate
} from '@/api/property'
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
      tableKey: 0,
      uploadBtn: false,
      iconUpload: 'el-icon-upload'
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
  },
  methods: {
    /* 下载小区模板功能 */
    handleDownload() {
      const url = `http://${window.location.host}/api/basicServer/estate/exportEstateModule?communityId=${this.communityId}`
      window.location.href = url
    },
    /* 限制只能上传一个文件 */
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    /* 导入数据 */
    submitUpload(content) { // 自定义的上传方法
      const _this = this
      _this.uploadBtn = true
      _this.iconUpload = 'el-icon-loading'
      const formdata = new FormData()
      formdata.append('file', content.file)
      formdata.append('communityId', this.communityId) // 获取小区id
      importEstate(formdata)
        .then(response => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              _this.uploadBtn = false
              _this.iconUpload = 'el-icon-upload'
              this.$notify({
                title: '成功',
                message: '导入成功',
                type: 'success',
                duration: 2000
              })
            }
          }
        })
        .catch(function(error) {
          _this.uploadBtn = false
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
.upload-property {
  display: inline-flex;
}
</style>
