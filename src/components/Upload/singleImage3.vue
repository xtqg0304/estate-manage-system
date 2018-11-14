<template>
  <div class="upload-container">
    <el-upload v-show="imageUrl.length<=1" :data="dataObj" :multiple="false" :show-file-list="false" :on-success="handleImageSuccess" :http-request="submitUpload" class="image-uploader" drag action="">
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        <em>点击上传</em>
      </div>
    </el-upload>
    <div v-show="imageUrl.length>1" class="image-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/api/upload'

export default {
  name: 'SingleImageUpload3',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess(file) {
      this.emitInput(file.data.data)
    },
    beforeUpload() {
      // const _self = this
      // return new Promise((resolve, reject) => {
      //   getToken().then(response => {
      //     debugger
      //     const key = response.data.qiniu_key
      //     const token = response.data.qiniu_token
      //     _self._data.dataObj.token = token
      //     _self._data.dataObj.key = key
      //     this.tempUrl = response.data.qiniu_url
      //     resolve(true)
      //   }).catch(err => {
      //     console.log(err)
      //     reject(false)
      //   })
      // })
    },
    /* 导入图片*/
    submitUpload(content) { // 自定义的上传方法
      const formdata = new FormData()
      formdata.append('file', content.file)
      getToken(formdata)
        .then(response => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              this.handleImageSuccess(response)
              this.$notify({
                title: '成功',
                message: '图片上传成功',
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 70%;
    position: relative;
  }
  .image-preview {
    width: 231px;
    height: 200px;
    position: relative;
    top: 0;
    left: 0;
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    .image-preview-wrapper {
      border-radius: 5px;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .image-preview-action {
      border-radius: 5px;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
