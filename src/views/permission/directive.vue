<template>
  <div class="app-container">
    <!-- <switch-roles @change="handleRolesChange" /> -->
    <button @click="EstateClick">estate</button>
    <button @click="PayClick">pay</button>
    <div style="margin-top:30px;">
      <code>In some cases it is not suitable to use v-permission, such as element Tab component which can only be achieved by manually setting the v-if.
        <br> e.g.
      </code>
      <el-tabs type="border-card" style="width:500px;">
        <el-tab-pane v-if="checkPermission(['estate'])" label="estate">estate can see this</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['pay'])" label="pay">pay can see this</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['estate','pay'])" label="Both">Both can see this</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  name: 'DirectivePermission',
  methods: {
    checkPermission,
    EstateClick() {
      this.$store.dispatch('ChangeRoles', 'estate').then(() => {
      })
    },
    PayClick() {
      this.$store.dispatch('ChangeRoles', 'pay').then(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  /deep/ .permission-alert {
    width: 320px;
    margin-top: 30px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: block;
  }
  /deep/ .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>
