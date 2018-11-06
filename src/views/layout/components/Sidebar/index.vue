<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <router-link id="logo-img" to="/home">
        <img src="@/assets/images/logo.png" alt="">
        <span>仟泰科技</span>
      </router-link>
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Item from './Item'

export default {
  components: { SidebarItem, Item },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },

  watch: {
    // isCollapse(curVal, oldVal) {
    //   if (!curVal) { // 侧边菜单展开
    //     const eleA = document.getElementsByClassName('menu-wrapper')[0].firstElementChild
    //     eleA.setAttribute('id', 'titleLogo')
    //   } else { // 侧边菜单收起来
    //     const eleA = document.getElementsByClassName('menu-wrapper')[0].firstElementChild
    //     eleA.setAttribute('id', 'titleLogoClose')
    //   }
    // }
  },
  created() {
  },
  updated() {
    // const eleLi = document.getElementsByClassName('menu-wrapper')[0].firstElementChild.firstElementChild
    // const eleSvg = document.getElementsByClassName('menu-wrapper')[0].firstElementChild.firstElementChild.firstElementChild
    // const eleSpan = document.getElementsByClassName('menu-wrapper')[0].firstElementChild.firstElementChild.lastElementChild
    // eleLi.setAttribute('style', 'padding-left: 5px !important')
    // eleSvg.setAttribute('style', 'width: 3em !important;height: 3em !important;fill: #f4516c !important;vertical-align: -1.5em !important;margin-right: 3px !important')
    // eleSpan.setAttribute('style', 'color: #bfcbd9 !important;vertical-align: -0.3em;font-size: 20px;')
    // console.log(this.sidebar.opened)
    // if (this.sidebar.opened) {
    //   console.log(this.sidebar.opened)
    //   const eleLi = document.getElementsByClassName('menu-wrapper')[0].firstElementChild.firstElementChild
    //   const eleSvg = document.getElementsByClassName('menu-wrapper')[0].firstElementChild.firstElementChild.firstElementChild
    //   const eleSpan = document.getElementsByClassName('menu-wrapper')[0].firstElementChild.firstElementChild.lastElementChild
    //   eleLi.setAttribute('style', 'padding-left: 5px !important')
    //   eleSvg.setAttribute('style', 'width: 3em !important;height: 3em !important;fill: #f4516c !important;vertical-align: -1.5em !important;margin-right: 3px !important')
    //   eleSpan.setAttribute('style', 'color: #bfcbd9 !important;vertical-align: -0.3em;font-size: 20px;')
    // } else {
    // }
  }
}
</script>
<style scoped>
#logo-img{
  margin:15px 0;
  margin-left: 13px;
}
#logo-img img{
  width: 30px;
  margin-right: 15px;
}
#logo-img span{
  font-size:20px;
  color:#bfcbd9;
  display:inline-block;
}
.el-menu--collapse #logo-img {
  margin:15px 0;
  margin-left: 3px !important;
}
.el-menu--collapse #logo-img span {
  display:none;
}
</style>
