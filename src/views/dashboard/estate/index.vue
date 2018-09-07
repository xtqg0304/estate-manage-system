<template>
  <div class="icons-container">
    <div class="icons-wrapper">
      <div>

        <el-tooltip placement="top">
          <div slot="content">
            小区公告
          </div>
          <div class="icon-item">
            <svg-icon icon-class="notice" />
            <span>小区公告 </span>
          </div>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            小区咨讯
          </div>
          <div class="icon-item">
            <svg-icon icon-class="news" />
            <span>小区咨讯 </span>
          </div>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            报事报修
          </div>
          <div class="icon-item">
            <svg-icon icon-class="repair" />
            <span>报事报修 </span>
          </div>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            投诉建议
          </div>
          <div class="icon-item">
            <svg-icon icon-class="advise" />
            <span>投诉建议 </span>
          </div>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            便民电话
          </div>
          <div class="icon-item">
            <svg-icon icon-class="phone" />
            <span>便民电话 </span>
          </div>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            更多功能建设中...
          </div>
          <div class="icon-item">
            <svg-icon icon-class="build" />
            <span>更多功能 </span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Icons',
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icons-container {
  margin: 80px 250px 0;
  overflow: hidden;
  .icons-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    margin: 20px calc((100% - 600px) / 6);
    height: 160px;
    text-align: center;
    width: 200px;
    float: left;
    font-size: 30px;
    color: #595959;
    cursor: pointer;
    border: 1px solid #e9e9e9;
    padding-top: 40px;
    &:hover {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      border-color: rgba(0, 0, 0, 0.2);
    }
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }
  .disabled {
    pointer-events: none;
  }
}
</style>
