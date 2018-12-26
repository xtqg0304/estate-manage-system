<template>
  <el-menu class="navbar"
           mode="horizontal">
    <hamburger :toggle-click="toggleSideBar"
               :is-active="sidebar.opened"
               class="hamburger-container" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <error-log class="errLog-container right-menu-item" />
      <el-select v-model="selectAppId"
                 style="float:left;"
                 placeholder="请选择"
                 @change="handelChange">
        <el-option v-for="item in appPermission"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id" />
      </el-select>
      <!-- <treeselect class="treeSelect" v-model="selectSysId" :multiple="false" :options="permission" placeholder="切换子系统"/> -->
      <el-select v-if="!showCommunity"
                 v-model="communityId"
                 style="float:left;"
                 placeholder="请选择"
                 @change="handelChangeCommunity">
        <el-option v-for="item in communityList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id" />
      </el-select>
      <!-- <el-dropdown v-if="showCommunity" class="avatar-container right-menu-item">
        <div class="avatar-wrapper">
          <span @click="handelShow">
            <svg-icon icon-class="mapLabel1">&nbsp;</svg-icon>{{ selectCommunityText }}
          </span>
        </div>
      </el-dropdown> -->
      <div v-if="showCommunity"
           class="avatar-container right-menu-item"
           style="margin-left:30px;color:#606266;font-size:14px;">
        <div class="avatar-wrapper">
          <span @click="handelShow">
            <svg-icon icon-class="mapLabel1">&nbsp;</svg-icon>{{ communityName }}
          </span>
        </div>
      </div>
      <!-- <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
        <screenfull class="screenfull right-menu-item" />
      </el-tooltip> -->

      <!-- <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
        <size-select class="international right-menu-item" />
      </el-tooltip> -->

      <!-- <lang-select class="international right-menu-item" /> -->

      <!-- <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
        <theme-picker class="theme-switch right-menu-item" />
      </el-tooltip> -->

      <el-dropdown class="avatar-container right-menu-item"
                   trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <img class="user-avatar">
          <span>
            <svg-icon icon-class="user">&nbsp;</svg-icon>{{ trueName }}
          </span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/home">
            <el-dropdown-item>
              {{ $t('navbar.home') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;"
                  @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import {
  getBuildingList,
  getRoomList
} from '@/api/property'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  data() {
    return {
      showCommunity: true,
      appPermission: [],
      selectAppId: '',
      communityId: '',
      communityName: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ]),
    trueName() {
      const sessionData = sessionStorage.getItem('trueName')
      if (this.$store.getters.trueName === '' && sessionData) {
        this.$store.commit('SET_TRUENAME', sessionData)// 同步操作
      }
      return this.$store.getters.trueName
    },
    selectSysId() {
      const sessionData = sessionStorage.getItem('subSystemId')
      if (this.$store.getters.subSystemId === '' && sessionData) {
        this.$store.commit('SET_SUBSYSTEMID', sessionData)// 同步操作
      }
      return this.$store.getters.subSystemId
    },
    selectCommunityText() {
      const sessionData = sessionStorage.getItem('selectCommunityName')
      if (this.$store.getters.selectCommunityName === '' && sessionData) {
        this.$store.commit('SET_SELECTCOMMUNITYNAME', sessionData)// 同步操作
      }
      return this.$store.getters.selectCommunityName
    },
    selectCommunity() {
      const sessionData = sessionStorage.getItem('selectCommunity')
      if (this.$store.getters.selectCommunity === '' && sessionData) {
        this.$store.commit('SET_SELECTCOMMUNITY', sessionData)// 同步操作
      }
      return this.$store.getters.selectCommunity
    },
    permissionSys() {
      const sessionData = JSON.parse(sessionStorage.getItem('permission'))
      if (this.$store.getters.permission.length === 0 && sessionData) {
        this.$store.commit('SET_PERMISSION', sessionData)// 同步操作
      }
      return this.$store.getters.permission
    },
    communityList() {
      const sessionData = JSON.parse(sessionStorage.getItem('communityList'))
      if (this.$store.getters.communityList.length === 0 && sessionData) {
        this.$store.commit('SET_COMMUNITYLIST', sessionData)// 同步操作
      }
      return this.$store.getters.communityList
    }
  },
  created() {
    this.selectAppId = this.selectSysId
    this.communityId = this.selectCommunity
    this.communityName = this.selectCommunityText
    this.handlePermissionSys()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    /* 将父子关系的数组转成树结构的数据 */
    handelResetPermission() {
      const attr = {
        id: 'id',
        parentId: 'parentId',
        name: 'name',
        rootId: '#'
      }
      const toTreeData = (data, attr) => {
        const tree = []
        const resData = data
        for (let i = 0; i < resData.length; i++) {
          if (resData[i].parentId === attr.rootId) {
            const obj = {
              id: resData[i][attr.id],
              name: resData[i][attr.name],
              label: resData[i][attr.name],
              children: []
            }
            tree.push(obj)
            resData.splice(i, 1)
            i--
          }
        }
        var run = function(treeArrs) {
          if (resData.length > 0) {
            for (let i = 0; i < treeArrs.length; i++) {
              for (let j = 0; j < resData.length; j++) {
                if (treeArrs[i].id === resData[j][attr.parentId]) {
                  const obj = {
                    id: resData[j][attr.id],
                    name: resData[j][attr.name],
                    label: resData[j][attr.name],
                    children: []
                  }
                  treeArrs[i].children.push(obj)
                  resData.splice(j, 1)
                  j--
                }
              }
              run(treeArrs[i].children)
            }
          }
        }
        run(tree)
        return tree
      }
      this.permission = toTreeData(this.permissionSys, attr)
      console.log('permission')
      console.log(this.permission)
    },
    /** 子系统切换 */
    handelChange(value) {
      console.log(value)
      this.$store.commit('SET_SUBSYSTEMID', value)
      this.$store.dispatch('GenerateRoutes', value).then(() => {
        this.$router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
        // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
    },
    /** 退出登录 */
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({ path: '/login' })
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    /** 切换小区 */
    handelChangeCommunity(value) {
      // console.log(value)
      // let communityIdTemp = value
      this.$store.commit('SET_SELECTCOMMUNITY', value)
      this.getCommunityText()
      getBuildingList({ id: value }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            const buildings = response.data.data
            const roomList = buildings.map(v => {
              v.label = v.buildingName
              v.value = v.id
              v.children = []
              return v
            })
            for (let i = 0; i < roomList.length; i++) {
              getRoomList({ communityId: value, buildingId: roomList[i].id }).then(response => {
                if (response.status === 200) {
                  if (response.data.code === 200) {
                    const rooms = response.data.data
                    roomList[i].children = rooms.map(v => {
                      v.label = v.room
                      v.value = v.id
                      return v
                    })
                  }
                }
              })
            }
            this.$store.commit('SET_ROOMLIST', roomList)
          }
        }
      })
      this.showCommunity = true
    },
    /** 控制显示 小区文字/选择小区下拉 */
    handelShow() {
      this.showCommunity = false
    },
    /** 根据小区id 获取对应小区的名字 */
    getCommunityText() {
      for (let i = 0; i < this.communityList.length; i++) {
        if (this.communityList[i].id === this.communityId) {
          this.communityName = this.communityList[i].name
          this.$store.commit('SET_SELECTCOMMUNITYNAME', this.communityName)
        }
      }
    },
    handlePermissionSys() {
      for (let i = 0; i < this.permissionSys.length; i++) {
        if (this.permissionSys[i].appResourceType === 'TYPE_APPLICATION') {
          this.appPermission.push(this.permissionSys[i])
        }
      }
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    // .treeSelect{
    //   width: 200px;
    //   float: left;
    //   line-height: 35px;
    //   top: 6px;
    // }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          // width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        span {
          position: relative;
          top: -15px;
          .svg-icon {
            font-size: 1.2em;
          }
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
