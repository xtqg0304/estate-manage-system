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
              {{ name }}
              <i class="el-icon-caret-bottom" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>
                <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
              </el-dropdown-item>
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
                <svg-icon icon-class="video" />
              </a>
              <span>视频系统</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.moreSys }}">
            <li>
              <a :href="allSysList[1].serverLink " class="to top ">
                <svg-icon icon-class="device" />
              </a>
              <span>设备管理</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.moreSys }}">
            <li>
              <a :href="allSysList[1].serverLink " class="to top ">
                <svg-icon icon-class="face" />
              </a>
              <span>人脸识别</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.moreSys }}">
            <li>
              <a :href="allSysList[1].serverLink " class="to top ">
                <svg-icon icon-class="shop" />
              </a>
              <span>社区商城</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.moreSys }}">
            <li>
              <a :href="allSysList[1].serverLink " class="to top ">
                <svg-icon icon-class="multiscreen" />
              </a>
              <span>多屏互动</span>
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
                <div style="height:33.33%; ">
                  <histogram :histogramdata="estatePaydata"/>
                </div>
                <div style="height:33.33%; ">
                  <histogram :histogramdata="vehiclePaydata"/>
                </div>
                <div style="height:33.33%; ">
                  <histogram :histogramdata="tempstopPaydata"/>
                </div>
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
                <div style="height:50%; ">
                  <linechart :linedata="userActivedata" />
                </div>
                <div style="height:50%; ">
                  <linechart :linedata="userVisitdata"/>
                </div>
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
                <div style="width:50%;height:50%;float:left;">
                  <ringchart :ringdata="doorAnalysisdata"/>
                </div>
                <div style="width:50%;height:50%;float:left;">
                  <ringchart :ringdata="vehicleAnalysisdata"/>
                </div>
                <div style="width:50%;height:50%;float:left;">
                  <ringchart :ringdata="eventAnalysisdata"/>
                </div>
                <div style="width:50%;height:50%;float:left;">
                  <ringchart :ringdata="eventpercentAnalysisdata"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="dataVisual-con dataVisual-con-left">
      <li class="dataVisual-item ">
        <div class="dataVisual-item-t numbox ">
          <div class="dataVisual-bgImg numb ">
            <div class="main-box " style="width:100%;height:100%;">
              <div class="main-box-content " style="width:100%;min-height:300px;height:100%; ">
                <tablecomponent :tabledata="userTabledata"/>
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
                <tablecomponent :tabledata="doorTabledata"/>
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
                <tablecomponent :tabledata="vehicleTabledata"/>
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
      estatePaydata: {
        chartData: {
          columns: ['日期', '金额'],
          rows: [
            { '日期': '1/1', '金额': 43 },
            { '日期': '1/2', '金额': 30 },
            { '日期': '1/3', '金额': 53 },
            { '日期': '1/4', '金额': 93 },
            { '日期': '1/5', '金额': 32 },
            { '日期': '1/6', '金额': 85 },
            { '日期': '1/7', '金额': 23 },
            { '日期': '1/8', '金额': 30 },
            { '日期': '1/9', '金额': 53 },
            { '日期': '1/10', '金额': 23 },
            { '日期': '1/11', '金额': 82 },
            { '日期': '1/12', '金额': 45 }
          ]
        },
        vChartOptions: {
          title: {
            text: '物业缴费'
          }
        }
      },
      vehiclePaydata: {
        chartData: {
          columns: ['日期', '金额'],
          rows: [
            { '日期': '1/1', '金额': 12 },
            { '日期': '1/2', '金额': 30 },
            { '日期': '1/3', '金额': 23 },
            { '日期': '1/4', '金额': 43 },
            { '日期': '1/5', '金额': 62 },
            { '日期': '1/6', '金额': 45 },
            { '日期': '1/7', '金额': 93 },
            { '日期': '1/8', '金额': 55 },
            { '日期': '1/9', '金额': 23 },
            { '日期': '1/10', '金额': 73 },
            { '日期': '1/11', '金额': 32 },
            { '日期': '1/12', '金额': 95 }
          ]
        },
        vChartOptions: {
          title: {
            text: '车位缴费'
          }
        }
      },
      tempstopPaydata: {
        chartData: {
          columns: ['日期', '金额'],
          rows: [
            { '日期': '1/1', '金额': 93 },
            { '日期': '1/2', '金额': 30 },
            { '日期': '1/3', '金额': 23 },
            { '日期': '1/4', '金额': 13 },
            { '日期': '1/5', '金额': 32 },
            { '日期': '1/6', '金额': 45 },
            { '日期': '1/7', '金额': 93 },
            { '日期': '1/8', '金额': 30 },
            { '日期': '1/9', '金额': 23 },
            { '日期': '1/10', '金额': 13 },
            { '日期': '1/11', '金额': 32 },
            { '日期': '1/12', '金额': 45 }
          ]
        },
        vChartOptions: {
          title: {
            text: '临停缴费'
          }
        }
      },
      userActivedata: {
        chartData: {
          columns: ['日期', '活跃用户'],
          rows: [
            { '日期': '2018-08-08', '活跃用户': 3 },
            { '日期': '2018-08-09', '活跃用户': 88 },
            { '日期': '2018-08-10', '活跃用户': 23 },
            { '日期': '2018-08-11', '活跃用户': 50 },
            { '日期': '2018-08-12', '活跃用户': 32 },
            { '日期': '2018-08-13', '活跃用户': 25 }
          ]
        },
        vChartOptions: {
          title: {
            text: '用户活跃度'
          }
        }
      },
      userVisitdata: {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '2018-08-08', '访问用户': 93 },
            { '日期': '2018-08-09', '访问用户': 30 },
            { '日期': '2018-08-10', '访问用户': 23 },
            { '日期': '2018-08-11', '访问用户': 13 },
            { '日期': '2018-08-12', '访问用户': 32 },
            { '日期': '2018-08-13', '访问用户': 45 }
          ]
        },
        vChartOptions: {
          title: {
            text: '用户访问量'
          }
        }
      },
      doorAnalysisdata: {
        chartData: {
          columns: ['类型', '用户数'],
          rows: [
            { '类型': '业主', '用户数': 50 },
            { '类型': '租客', '用户数': 30 },
            { '类型': '其他', '用户数': 23 }
          ]
        },
        vChartOptions: {
          title: {
            text: '门禁分析'
          }
        }
      },
      vehicleAnalysisdata: {
        chartData: {
          columns: ['支付类型', '用户数'],
          rows: [
            { '支付类型': '现金', '用户数': 93 },
            { '支付类型': '手机', '用户数': 30 },
            { '支付类型': '银联', '用户数': 50 }
          ]
        },
        vChartOptions: {
          title: {
            text: '车场分析'
          }
        }
      },
      eventAnalysisdata: {
        chartData: {
          columns: ['类型', '数值'],
          rows: [
            { '类型': '户内', '数值': 70 },
            { '类型': '户外', '数值': 30 }
          ]
        },
        vChartOptions: {
          title: {
            text: '报事分析'
          }
        }
      },
      eventpercentAnalysisdata: {
        chartData: {
          columns: ['状态', '百分比'],
          rows: [
            { '状态': '已完成', '百分比': 60 },
            { '状态': '未完成', '百分比': 40 }
          ]
        },
        vChartOptions: {
          title: {
            text: '报事完成率'
          }
        }
      },
      vehicleTabledata: {
        tableData: [
          {
            '车牌号': '闽A44444',
            '进场时间': '2018-09-03 15:30',
            '出场时间': '2018-09-03 16:20',
            '停车时长': '0小时50分',
            '金额（元）': '5元'
          },
          {
            '车牌号': '闽A44444',
            '进场时间': '2018-09-03 15:30',
            '出场时间': '2018-09-03 16:20',
            '停车时长': '0小时50分',
            '金额（元）': '5元'
          },
          {
            '车牌号': '闽A44444',
            '进场时间': '2018-09-03 15:30',
            '出场时间': '2018-09-03 16:20',
            '停车时长': '0小时50分',
            '金额（元）': '5元'
          },
          {
            '车牌号': '闽A44444',
            '进场时间': '2018-09-03 15:30',
            '出场时间': '2018-09-03 16:20',
            '停车时长': '0小时50分',
            '金额（元）': '5元'
          },
          {
            '车牌号': '闽A44444',
            '进场时间': '2018-09-03 15:30',
            '出场时间': '2018-09-03 16:20',
            '停车时长': '0小时50分',
            '金额（元）': '5元'
          },
          {
            '车牌号': '闽A44444',
            '进场时间': '2018-09-03 15:30',
            '出场时间': '2018-09-03 16:20',
            '停车时长': '0小时50分',
            '金额（元）': '5元'
          }
        ],
        formThead: ['车牌号', '进场时间', '出场时间', '停车时长', '金额（元）'],
        tableTitle: '停车实时数据',
        loading: true,
        dataEmpty: true
      },
      userTabledata: {
        tableData: [
          {
            '小区名称': '群升',
            '用户名': '王某',
            '登录方式': '公众号',
            '登录时间': '2018-06-03 16:50:20',
            '菜单': '缴费'
          },
          {
            '小区名称': '群升',
            '用户名': '王某',
            '登录方式': '公众号',
            '登录时间': '2018-06-03',
            '菜单': '缴费'
          },
          {
            '小区名称': '群升',
            '用户名': '王某',
            '登录方式': '公众号',
            '登录时间': '2018-06-03',
            '菜单': '缴费'
          },
          {
            '小区名称': '群升',
            '用户名': '王某',
            '登录方式': '公众号',
            '登录时间': '2018-06-03',
            '菜单': '缴费'
          },
          {
            '小区名称': '群升',
            '用户名': '王某',
            '登录方式': '公众号',
            '登录时间': '2018-06-03',
            '菜单': '缴费'
          },
          {
            '小区名称': '群升',
            '用户名': '王某',
            '登录方式': '公众号',
            '登录时间': '2018-06-03',
            '菜单': '缴费'
          }
        ],
        formThead: ['小区名称', '用户名', '登录方式', '登录时间', '菜单'],
        tableTitle: '用户实时数据',
        loading: true,
        dataEmpty: true
      },
      doorTabledata: {
        tableData: [
          {
            '用户': '张**',
            '类型': '业主',
            '门禁': '西门',
            '开门时间': '2018-06-06 15:30:20',
            '状态': '一键开门'
          },
          {
            '用户': '张**',
            '类型': '租客',
            '门禁': '西门',
            '开门时间': '2018-06-06',
            '状态': '扫码开门'
          },
          {
            '用户': '张**',
            '类型': '其他成员',
            '门禁': '西门',
            '开门时间': '2018-06-06',
            '状态': '一键开门'
          },
          {
            '用户': '张**',
            '类型': '业主',
            '门禁': '西门',
            '开门时间': '2018-06-06',
            '状态': '扫码开门'
          },
          {
            '用户': '张**',
            '类型': '业主',
            '门禁': '西门',
            '开门时间': '2018-06-06',
            '状态': '一键开门'
          },
          {
            '用户': '张**',
            '类型': '业主',
            '门禁': '西门',
            '开门时间': '2018-06-06',
            '状态': '一键开门'
          }
        ],
        formThead: ['用户', '类型', '门禁', '开门时间', '状态'],
        tableTitle: '门禁实时数据',
        loading: true,
        dataEmpty: true
      },
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
      'roles',
      'name'
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
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
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
  position: relative;
  top: -0.7rem;
  right: 0.5rem;
  font-size: 1rem;
  color: #fff;
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
  width: calc(10% - 2rem);
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
  background-color: #b3490f;
}
.navigation a:nth-child(4) a {
  background-color: #3973d2;
}
.navigation a:nth-child(6) a {
  background-color: #a74cf3;
}
.navigation a:nth-child(7) a {
  background-color: #0fc2d6;
}
.navigation a:nth-child(8) a {
  background-color: #3973d2;
}
.navigation a:nth-child(9) a {
  background-color: #7564fc;
}
.navigation a:nth-child(10) a {
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
  padding-bottom: 72%;
}
</style>
