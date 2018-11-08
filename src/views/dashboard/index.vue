<template>
  <div class="dashboard-container">
    <component v-if="checkPermission(['estate','pay'])" :is="currentRole" />
  </div>
</template>

<script>
import estateDashboard from './estate'
import payDashboard from './pay'
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  name: 'Dashboard',
  components: { estateDashboard, payDashboard },
  data() {
    return {
      currentRole: ''
    }
  },
  created() {
    // console.log(this.$route.params.systemName)
    if (this.$route.params.systemName.includes('estate')) {
      this.currentRole = 'estateDashboard'
    }
    if (this.$route.params.systemName.includes('pay')) {
      this.currentRole = 'payDashboard'
    }
    // console.log('this.$route.params.systemName')
    // console.log(this.$route.params.systemName)
    // this.$emit("sysId",this.$route.params.systemName)
  },
  methods: {
    checkPermission
  }
}
</script>
