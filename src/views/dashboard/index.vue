<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'
import estateDashboard from './estate'
import payDashboard from './pay'

export default {
  name: 'Dashboard',
  components: { estateDashboard, payDashboard },
  data() {
    return {
      currentRole: ''
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'roles'
  //   ])
  // },
  // beforeRouteEnter(to, from, next) {
  //   // console.log(to.params.systemName)
  //   // console.log('kkkk')
  //   next(vm => {
  //     // console.log(vm)
  //     // vm.changeRole()
  //   })
  // },
  created() {
    console.log(this.$route.params.systemName)
    if (this.$route.params.systemName.includes('estate')) {
      this.currentRole = 'estateDashboard'
    }
    if (this.$route.params.systemName.includes('pay')) {
      this.currentRole = 'payDashboard'
    }
    console.log(this.currentRole)
  },
  methods: {
    // changeRole() {
    //   this.$store.dispatch('ChangeRoles', this.$route.params.systemName).then(() => {
    //     console.log('dashboard roles')
    //     console.log(this.roles)
    //   }).catch(() => {
    //   })
    // }
  }
}
</script>
