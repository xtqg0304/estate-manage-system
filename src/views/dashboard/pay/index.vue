<template>
  <div class="icons-container">
    <div class="icons-wrapper">
      <div>
        <router-link to="/estatePay/bill">
          <el-tooltip placement="top">
            <div slot="content">
              缴费账单
            </div>
            <div class="icon-item">
              <svg-icon icon-class="paybill" />
              <span>缴费账单 </span>
            </div>
          </el-tooltip>
        </router-link>
        <router-link to="/estatePay/record">
          <el-tooltip placement="top">
            <div slot="content">
              缴费记录
            </div>
            <div class="icon-item">
              <svg-icon icon-class="payrecord" />
              <span>缴费记录 </span>
            </div>
          </el-tooltip>
        </router-link>
        <router-link to="/estatePay/detail">
          <el-tooltip placement="top">
            <div slot="content">
              缴费明细
            </div>
            <div class="icon-item">
              <svg-icon icon-class="paydetail" />
              <span>缴费明细 </span>
            </div>
          </el-tooltip>
        </router-link>
        <router-link to="/vehiclePay/monthlybill">
          <el-tooltip placement="top">
            <div slot="content">
              包月账单
            </div>
            <div class="icon-item">
              <svg-icon icon-class="paymonthly" />
              <span>包月账单 </span>
            </div>
          </el-tooltip>
        </router-link>
        <router-link to="/vehiclePay/monthlymoney">
          <el-tooltip placement="top">
            <div slot="content">
              包月缴费
            </div>
            <div class="icon-item">
              <svg-icon icon-class="paymoney" />
              <span>包月缴费 </span>
            </div>
          </el-tooltip>
        </router-link>
        <router-link to="/home">
          <el-tooltip placement="top">
            <div slot="content">
              更多功能建设中...
            </div>
            <div class="icon-item">
              <svg-icon icon-class="build" />
              <span>更多功能 </span>
            </div>
          </el-tooltip>
        </router-link>
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
