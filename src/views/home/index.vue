<template>
  <div class="home-bg">
    <header>
      <div class="header clearfix">
        <a class="header-logo">
          <svg-icon icon-class="logo" />智慧社区云
        </a>
        <div class="time">
          <div class="clock">
            <i id="Date" class="el-icon-time">{{ dateT }}</i>
            <ul>
              <li id="hours">{{ hoursT }} </li>
              <li id="point">:</li>
              <li id="min"> {{ minT }}</li>
              <li id="point">:</li>
              <li id="sec"> {{ secT }}</li>
            </ul>
          </div>
          <div class="user-avator">
            <svg-icon icon-class="user" />
          </div>
          <el-dropdown class="user-name" trigger="click">

            <span class="el-dropdown-link">
              111111111
              <i class="el-icon-caret-bottom" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/login">
                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class=" container clearfix">
        <ul class="navigation ">

          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.estateSys }}">
            <li>
              <a class="to top ">
                <svg-icon icon-class="repair" />
              </a>
              <span>物业管理</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.paySys }}">
            <li>
              <a :href="allSysList[2].serverLink " class="to top ">
                <svg-icon icon-class="pay" />
              </a>
              <span>基础缴费</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.doorSys }}">
            <li>
              <a :href="allSysList[3].serverLink " class="to top ">
                <svg-icon icon-class="door" />
              </a>
              <span>门禁管理</span>
            </li>
          </router-link>

          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.vehicleSys }}">
            <li>
              <a :href="allSysList[1].serverLink " class="to top ">
                <svg-icon icon-class="vehicle" />
              </a>
              <span>车辆管理</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.moreSys }}">
            <li>
              <a :href="allSysList[1].serverLink " class="to top ">
                <svg-icon icon-class="build" />
              </a>
              <span>更多系统</span>
            </li>
          </router-link>
        </ul>
      </div>
    </header>
    <ul class="dataVisual-con dataVisual-con-left">
      <li class="dataVisual-item ">
        <div class="dataVisual-item-t numbox ">
          <div class="dataVisual-bgImg numb ">
            <div class="main-box " style="width:100%;height:100%;">
              <div class="main-box-content " style="width:100%;min-height:300px;height:100%; ">
                <histogram />
                <!-- <histogram  style="width:100%;height:20%; " />
                <histogram  style="width:100%;height:20%; " /> -->
                <!-- <tablecomponent /> -->
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="dataVisual-con dataVisual-con-center">
      <li class="dataVisual-item ">
        <div class="dataVisual-item-t numbox ">
          <div class="dataVisual-bgImg numb ">
            <div class="main-box " style="width:100%;height:100%;">
              <div class="main-box-content " style="width:100%;min-height:300px;height:100%; ">
                <linechart />
                <tablecomponent />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="dataVisual-con dataVisual-con-right">
      <li class="dataVisual-item ">
        <div class="dataVisual-item-t numbox ">
          <div class="dataVisual-bgImg numb ">
            <div class="main-box " style="width:100%;height:100%;">
              <div class="main-box-content " style="width:100%;min-height:300px;height:100%; ">
                <ringchart />
                <tablecomponent />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import histogram from './histogram'
import linechart from './line'
import ringchart from './ring'
import tablecomponent from './table'
export default {
  components: {
    draggable,
    histogram,
    linechart,
    ringchart,
    tablecomponent
  },
  data() {
    return {
      systems: {
        /*
        estateSys  物业管理系统
        paySys     缴费管理系统
        doorSys    门禁管理系统
        vehicleSys 车辆管理系统
        moreSys    更多管理系统
        */
        estateSys: 'estate',
        paySys: 'pay',
        doorSys: 'door',
        vehicleSys: 'vehicle',
        moreSys: 'more'
      },
      dateT: '',
      secT: '',
      minT: '',
      hoursT: '',
      allSysList: [
        {
          icon: 'http://10.18.73.83:20080/resources/images/park.png',
          serverLink: '',
          serverName: '车辆出入口系统',
          sysTag: 'INOUT_PARK_SYS',
          authority: 'false'
        },
        {
          icon: 'http://10.18.72.34:8082/resources/images/system_icon.png',
          serverLink: '',
          serverName: '宿舍管理',
          sysTag: 'DORMITORY_SUB_SYSTEM',
          authority: 'false'
        },
        {
          icon: 'http://10.18.73.83:9090/resources/images/system_icon.png',
          serverLink: '',
          serverName: '门禁系统',
          sysTag: 'SMARTWAY_SUB_SYSTEM',
          authority: 'false'
        },
        {
          icon:
            'http://10.18.73.83:18888/statics/images/ordericon.png',
          serverLink: '',
          serverName: '场地预约',
          sysTag: 'SiteReservation',
          authority: 'false'

        },
        {
          icon: 'http://10.18.73.83:8080/resources/images/person.png',
          serverLink: '',
          serverName: '基础信息',
          sysTag: 'BASIC_SYSTEM',
          authority: 'false'
        },
        {
          icon: '',
          serverLink: 'http://192.168.70.3:9066/',
          serverName: '可视化系统',
          sysTag: 'VIDEO_SYSTEM',
          authority: 'true'
        }
      ],
      sysList: [],
      token: '',
      username: '',
      activeIndex: '0',
      accessControlData: {
        total: {
          text: '',
          data: ''
        },
        real: {
          text: '',
          data: ''
        },
        percent: {
          text: '',
          data: ''
        }
      },
      fieldObjData: {
        available: {
          text: '',
          data: ''
        },
        percent: {
          text: '',
          data: ''
        }
      },
      vehicleObjData: {
        inVehicle: {
          text: '',
          data: ''
        },
        percentInVehicle: {
          text: '',
          data: ''
        },
        outVehicle: {
          text: '',
          data: ''
        },
        percentOutVehicle: {
          text: '',
          data: ''
        },
        retention: {
          text: '',
          data: ''
        },
        percentRetention: {
          text: '',
          data: ''
        },
        surplusPark: {
          text: '',
          data: ''
        },
        inOutVehicle: {
          text: '',
          data: ''
        },
        percentInOutVehicle: {
          text: '',
          data: ''
        }
      },
      domitoryObjData: '',
      loginoutHref: ''
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  mounted() {
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const newDate = new Date()
    newDate.setDate(newDate.getDate())
    this.dateT = newDate.getFullYear() + '年' + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + dayNames[newDate.getDay()]
    const self = this
    // eslint-disable-next-line
    setInterval(function () {
      const seconds = new Date().getSeconds()
      self.secT = (seconds < 10 ? '0' : '') + seconds
    }, 1000)
    // eslint-disable-next-line
    setInterval(function () {
      const minutes = new Date().getMinutes()
      self.minT = (minutes < 10 ? '0' : '') + minutes
    }, 1000)
    // eslint-disable-next-line
    setInterval(function () {
      const hours = new Date().getHours()
      self.hoursT = (hours < 10 ? '0' : '') + hours
    }, 1000)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.SetRoleAdmin()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('ChangeRoles', to.params.systemName).then(() => {
    })
    next()
  },
  created() {
  },
  methods: {
    SetRoleAdmin() {
      this.$store.dispatch('ChangeRoles', 'admin').then(() => {
      })
    }
  }
}
</script>

<style scoped>
@import url(../../../static/css/index.css);
.home-bg {
  background: #263445;
}
.header {
  background: #263445;
}
.header-logo {
  float: left;
  color: #fff;
  line-height: 60px;
  font-size: 22px;
  padding-left: 10px;
}
.header-logo .svg-icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.7em;
  fill: #f4516c;
}
header .time {
  float: right;
  color: #fff;
  position: relative;
  top: 10px;
}
/*时间*/
header .clock {
  text-align: center;
  width: 20rem;
  display: inline-block;
}
header .clock ul {
  margin: 0;
  padding: 0;
}
header .clock i {
  font-size: 1.2rem;
}
header .clock ul li {
  display: inline;
  font-size: 1rem;
  text-align: center;
}
header .clock #point {
  position: relative;
  -moz-animation: mymove 1s ease infinite;
  -webkit-animation: mymove 1s ease infinite;
  padding-left: 5px;
  padding-right: 5px;
}
header .user-name {
  display: inline-block;
  color: #fff;
  position: relative;
  font-weight: bold;
  top: -0.7rem;
  right: 0.5rem;
  font-size: 1rem;
}
.user-avator {
  display: inline-block;
  color: #fff;
  position: relative;
  top: -0.5rem;
  right: 0.5rem;
  font-size: 1.5em;
}
@-webkit-keyframes mymove {
  0% {
    opacity: 1;
    text-shadow: 0 0 20px #00c6ff;
  }
  50% {
    opacity: 0;
    text-shadow: none;
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 20px #00c6ff;
  }
}

@-moz-keyframes mymove {
  0% {
    opacity: 1;
    text-shadow: 0 0 20px #00c6ff;
  }
  50% {
    opacity: 0;
    text-shadow: none;
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 20px #00c6ff;
  }
}
.container {
  margin: 0;
  font-size: 1.4rem;
  background: #2d3a4b;
}
.container ul.navigation {
  padding: 0;
  margin: 0;
}
.container .dataVisual-item {
  margin-bottom: 0;
}
.container .dataVisual-item-t {
  padding-bottom: 4em;
}
.navigation:after {
  content: '';
  display: block;
  clear: both;
}
.navigation li {
  list-style: none;
  float: left;
  width: calc(20% - 2rem);
  display: inline-block;
  margin: 1rem;
}
.navigation li span {
  display: block;
  text-align: center;
  color: #bfcbd9;
  font-size: 0.8rem;
  margin-top: 10px;
}
.navigation li a {
  display: block;
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  line-height: 3em;
  text-align: center;
  background-color: #7564fc;
  margin: 0 auto;
  color: #fff;
}
.navigation li a .svg-icon {
  font-size: 1.5em;
  color: #fff;
}
.navigation a:nth-child(3) a {
  background-color: #a74cf3;
}
.navigation a:nth-child(2) a {
  background-color: #0fc2d6;
}
.navigation a:nth-child(5) a {
  background-color: #ff305c;
}
.navigation a:nth-child(4) a {
  background-color: #3973d2;
}
.navigation a:nth-child(6) a {
  background-color: #b3490f;
}
.dataVisual-con-left,
.dataVisual-con-center,
.dataVisual-con-right {
  width: 33.33%;
  margin: 0;
}
.dataVisual-con-left .dataVisual-item-t,
.dataVisual-con-center .dataVisual-item-t,
.dataVisual-con-right .dataVisual-item-t {
  padding-bottom: 120%;
}

</style>
