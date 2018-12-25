<template>
  <div class="home-bg">
    <header>
      <div class="header clearfix">
        <a class="header-logo">
          <img style="width: 8%;vertical-align: middle;"
               src="@/assets/images/logo.png">
          物业宝
        </a>
        <div class="time">
          <div class="clock">
            <i id="Date"
               class="el-icon-time">{{ dateT }}</i>
            <ul>
              <li id="hours">{{ hoursT }} </li>
              <li id="point">:</li>
              <li id="min"> {{ minT }}</li>
              <li id="point">:</li>
              <li id="sec"> {{ secT }}</li>
            </ul>
          </div>
          <!-- <div class="user-avator">
            <svg-icon icon-class="user" />
          </div>
          <el-dropdown
            class="user-name"
            trigger="click">
            <span class="el-dropdown-link">
              {{ trueName }}
              <i class="el-icon-caret-bottom" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>
                <span
                  style="display:block;"
                  @click="logout">{{ $t('navbar.logOut') }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
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
              <a class="to top ">
                <svg-icon icon-class="pay" />
              </a>
              <span>基础缴费</span>
            </li>
          </router-link>
          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.doorSys }}">
            <li>
              <a class="to top ">
                <svg-icon icon-class="door" />
              </a>
              <span>门禁管理</span>
            </li>
          </router-link>

          <router-link :to="{ name: 'Dashboard', params: { systemName: systems.vehicleSys }}">
            <li>
              <a class="to top ">
                <svg-icon icon-class="vehicle" />
              </a>
              <span>车辆管理</span>
            </li>
          </router-link>
          <router-link :to="{}">
            <li @click="showMsg()">
              <a class="to top ">
                <svg-icon icon-class="video" />
              </a>
              <span>视频监控</span>
            </li>
          </router-link>
          <router-link :to="{}">
            <li @click="showMsg()">
              <a class="to top ">
                <svg-icon icon-class="abnormalAlarm" />
              </a>
              <span>周界报警</span>
            </li>
          </router-link>
          <router-link :to="{}">
            <li @click="showMsg()">
              <a class="to top ">
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
            <div class="main-box "
                 style="width:100%;height:100%;">
              <div class="main-box-content "
                   style="width:100%;min-height:300px;height:100%; ">

                <div style="height:50%; ">
                  <linechart :linedata="userActivedata" />
                </div>
                <div style="height:50%; ">
                  <linechart :linedata="userVisitdata" />
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
            <div class="main-box "
                 style="width:100%;height:100%;">
              <div class="main-box-content "
                   style="width:100%;min-height:300px;height:100%; ">

                <div style="width:50%;height:50%;float:left;">
                  <ringchart :ringdata="doorAnalysisdata" />
                </div>
                <div style="width:50%;height:50%;float:left;">
                  <ringchart :ringdata="payTypeAnalysisdata" />
                </div>
                <div style="width:50%;height:50%;float:left;">
                  <ringchart :ringdata="eventAnalysisdata" />
                </div>
                <div style="width:50%;height:50%;float:left;">
                  <ringchart :ringdata="eventpercentAnalysisdata" />
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
            <div class="main-box "
                 style="width:100%;height:100%;">
              <div class="main-box-content "
                   style="width:100%;min-height:300px;height:100%; ">
                <div style="height:33.33%; ">
                  <histogram :histogramdata="estatePaydata" />
                </div>
                <div style="height:33.33%; ">
                  <histogram :histogramdata="vehiclePaydata" />
                </div>
                <div style="height:33.33%; ">
                  <histogram :histogramdata="tempstopPaydata" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="dataVisual-con dataVisual-con-table">
      <li class="dataVisual-item ">
        <div class="dataVisual-item-t numbox ">
          <div class="dataVisual-bgImg numb ">
            <div class="main-box "
                 style="width:100%;height:100%;">
              <div class="main-box-content "
                   style="width:100%;min-height:300px;height:100%; ">
                <tablecomponent :tabledata="userTabledata" />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="dataVisual-con dataVisual-con-table">
      <li class="dataVisual-item ">
        <div class="dataVisual-item-t numbox ">
          <div class="dataVisual-bgImg numb ">
            <div class="main-box "
                 style="width:100%;height:100%;">
              <div class="main-box-content "
                   style="width:100%;min-height:300px;height:100%; ">
                <tablecomponent :tabledata="doorTabledata" />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="dataVisual-con dataVisual-con-table">
      <li class="dataVisual-item ">
        <div class="dataVisual-item-t numbox ">
          <div class="dataVisual-bgImg numb ">
            <div class="main-box "
                 style="width:100%;height:100%;">
              <div class="main-box-content "
                   style="width:100%;min-height:300px;height:100%; ">
                <tablecomponent :tabledata="vehicleTabledata" />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  fetchPayTypeAnalysis,
  fetchPropertyPayAnalysis,
  fetchPropertyPayTrend,
  fetchDevicetypeCount,
  fetchComplaintStatus,
  fetchDeviceInoutPage,
  fetchInOutCountInfo,
  fetchParkingChargeInfo,
  fetchParkingRealTimeInfo,
  fetchComplaintStatusTrend,
  fetchtDcInoutFlagType
} from '@/api/homeChart'
import { getUserCommunity } from '@/api/communityManage'
import {
  fetchPropertyOrderList
} from '@/api/payManage'
import { parseTime } from '@/utils'
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
  filters: {

  },
  data() {
    return {
      estatePaydata: {},
      vehiclePaydata: {},
      tempstopPaydata: {},
      userActivedata: {},
      userVisitdata: {},
      doorAnalysisdata: {},
      payTypeAnalysisdata: {},
      eventAnalysisdata: {},
      eventpercentAnalysisdata: {},
      vehicleTabledata: {},
      userTabledata: {},
      doorTabledata: {},
      systems: {
        /*
        estateSys  物业管理系统
        paySys     缴费管理系统
        doorSys    门禁管理系统
        vehicleSys 车辆管理系统
        moreSys    更多管理系统
        */
        estateSys: '',
        paySys: '',
        doorSys: '',
        vehicleSys: '',
        moreSys: ''
      },
      dateT: '',
      secT: '',
      minT: '',
      hoursT: '',
      communityIds: []
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'name'
    ]),
    trueName() {
      const sessionData = sessionStorage.getItem('trueName')
      if (this.$store.getters.trueName === '' && sessionData) {
        this.$store.commit('SET_TRUENAME', sessionData)// 同步操作
      }
      return this.$store.getters.trueName
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
    this._handelCommunityIds()
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_SUBSYSTEMID', to.params.systemName)
    this.$store.dispatch('GenerateRoutes', to.params.systemName).then(() => {
      this.$router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
    })
    this.$store.dispatch('delAllVisitedViews') // 清空tagview的已访问过的连接
    this.$store.dispatch('delAllCachedViews') // 清空tagview的已访问过的缓存连接
    next()
  },
  created() {
    this.handelPermission()
    this.getPayType()
    this.getPropertyPay()
    this.getPropertyPayTrend()
    this.getDevicetypeCount()
    this.getDeviceInoutPage()
    this.getOrderList()
  },
  methods: {
    handelPermission() {
      this.permissionSys.forEach((value, index) => {
        if (value.name === '物管系统') {
          this.systems.estateSys = value.id
        } else if (value.name === '缴费系统') {
          this.systems.paySys = value.id
        } else if (value.name === '门禁系统') {
          this.systems.doorSys = value.id
        } else if (value.name === '车辆系统') {
          this.systems.vehicleSys = value.id
        }
      })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({ path: '/login' })
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    showMsg() {
      this.$message({
        message: '感谢您的使用,更多功能敬请期待',
        type: 'success',
        duration: 2000
      })
    },
    getPayType() { // 获取一个月内的支付分析
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchPayTypeAnalysis({ beginTime: parseTime(beginTime), endTime: parseTime(endTime) }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.payTypeAnalysisdata = Object.assign({}, response.data.data.eventAnalysisdata)
          }
        }
      })
    },
    getPropertyPay() { // 获取一个月内的物缴分析
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchPropertyPayAnalysis({ beginTime: parseTime(beginTime), endTime: parseTime(endTime) }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.eventAnalysisdata = Object.assign({}, response.data.data.eventAnalysisdata)
          }
        }
      })
    },
    getPropertyPayTrend() { // 获取一个月内的物缴趋势
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchPropertyPayTrend({ beginTime: parseTime(beginTime), endTime: parseTime(endTime) }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.estatePaydata = Object.assign({}, response.data.data.estatePaydata)
          }
        }
      })
    },
    getComplaintStatusTrend() { // 获取报事报修趋势图数据
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchComplaintStatusTrend({ beginTime: parseTime(beginTime), endTime: parseTime(endTime), communityIdList: this.communityIds }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.tempstopPaydata = Object.assign({}, response.data.data.eventAnalysisdata)
          }
        }
      })
    },
    getDcInoutFlagType() { // 获取进出记录趋势图数据
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchtDcInoutFlagType({ beginTime: parseTime(beginTime), endTime: parseTime(endTime), communityIdList: this.communityIds }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.userActivedata = Object.assign({}, response.data.data.eventAnalysisdata)
          }
        }
      })
    },
    getDevicetypeCount() { // 门禁分析数据
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchDevicetypeCount({ beginTime: parseTime(beginTime), endTime: parseTime(endTime) }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.doorAnalysisdata = {
              chartData: {
                columns: ['设备类型', '个数'],
                rows: []
              },
              vChartOptions: {
                title: {
                  text: '门禁设备'
                }
              }
            }
            if (response.data.data.deviceList.length > 0) {
              for (let i = 0, len = response.data.data.deviceList.length; i < len; i++) {
                this.doorAnalysisdata.chartData.rows.push({ '设备类型': response.data.data.deviceList[i].deviceFactoryName, '个数': response.data.data.deviceList[i].devType })
              }
            }
          }
        }
      })
    },
    getComplaintStatus() { // 获取报事报修分析数据
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchComplaintStatus({ beginTime: parseTime(beginTime), endTime: parseTime(endTime), communityIdList: this.communityIds }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.eventpercentAnalysisdata = {
              chartData: {
                columns: ['状态', '个数'],
                rows: []
              },
              vChartOptions: {
                title: {
                  text: '报事状态'
                }
              }
            }
            if (response.data.data.qryComplaintElementData.length > 0) {
              for (let i = 0, len = response.data.data.qryComplaintElementData.length; i < len; i++) {
                if (response.data.data.qryComplaintElementData[i].status === 'WAITING') {
                  this.eventpercentAnalysisdata.chartData.rows.push({ '状态': '等待处理', '个数': response.data.data.qryComplaintElementData[i].statusCount })
                } else if (response.data.data.qryComplaintElementData[i].status === 'PROCESSED') {
                  this.eventpercentAnalysisdata.chartData.rows.push({ '状态': '已处理', '个数': response.data.data.qryComplaintElementData[i].statusCount })
                } else if (response.data.data.qryComplaintElementData[i].status === 'Reply') {
                  this.eventpercentAnalysisdata.chartData.rows.push({ '状态': '回复', '个数': response.data.data.qryComplaintElementData[i].statusCount })
                }
              }
            }
          }
        }
      })
    },
    getDeviceInoutPage() { // 获取门禁实时数据
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchDeviceInoutPage({ beginTime: parseTime(beginTime), endTime: parseTime(endTime), currentPage: 1, pageSize: 10 }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.doorTabledata = {
              formThead: ['用户', '设备名称', '时间', '状态'],
              tableTitle: '门禁实时数据'
            }
            let items = []
            items = response.data.data.qryDeviceData
            if (items.length > 0) {
              this.doorTabledata.tableData = []
              for (let i = 0; i < items.length; i++) {
                if (items[i].inoutSuccess === 1) {
                  this.doorTabledata.tableData.push({
                    '用户': items[i].inoutuserName,
                    '设备名称': items[i].deviceName,
                    '时间': parseTime(items[i].addTime),
                    '状态': '刷卡成功'
                  })
                } else {
                  this.doorTabledata.tableData.push({
                    '用户': items[i].inoutuserName,
                    '设备名称': items[i].deviceName,
                    '时间': parseTime(items[i].addTime),
                    '状态': '刷卡失败'
                  })
                }
              }
            } else {
              this.doorTabledata.tableData = []
            }
          }
        }
      })
    },
    getInOutCountInfo() { // 获取进出车辆数据统计
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchInOutCountInfo({ beginTime: parseTime(beginTime), endTime: parseTime(endTime), communityId: this.communityIds }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.userVisitdata = Object.assign({}, response.data.data.data)
          }
        }
      })
    },
    getParkingChargeInfo() { // 获取停车缴费统计
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchParkingChargeInfo({ beginTime: parseTime(beginTime), endTime: parseTime(endTime), communityId: this.communityIds }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.vehiclePaydata = Object.assign({}, response.data.data.data)
          }
        }
      })
    },
    getParkingRealTimeInfo() { // 获取停车实时数据
      const endTime = new Date()
      let beginTime = new Date()
      beginTime = beginTime.setDate(beginTime.getDate() - 30) // 减少30天
      beginTime = new Date(beginTime)
      fetchParkingRealTimeInfo({ beginTime: parseTime(beginTime), endTime: parseTime(endTime), communityId: this.communityIds }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.vehicleTabledata = {
              formThead: [],
              tableTitle: ''
            }
            this.vehicleTabledata.formThead = response.data.data.data.formThead
            this.vehicleTabledata.tableTitle = response.data.data.data.tableTitle
            const items = response.data.data.data.tableData
            if (items.length > 0) {
              this.vehicleTabledata.tableData = []
              for (let i = 0; i < items.length; i++) {
                this.vehicleTabledata.tableData.push({
                  '车牌号': items[i]['车牌号'],
                  '进场时间': parseTime(items[i]['进场时间']),
                  '出场时间': parseTime(items[i]['出场时间']),
                  '停车时长': this._timeStamp(items[i]['停车时长']),
                  '金额(元)': items[i]['金额(元)']
                })
              }
            } else {
              this.vehicleTabledata.tableData = []
            }
          }
        }
      })
    },
    getOrderList() { // 获取物业缴费订单实时数据
      fetchPropertyOrderList({ currentPage: 1, pageSize: 10 }).then(response => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            this.userTabledata = {
              formThead: ['房产名称', '业主名称', '支付时间', '金额（元）'],
              tableTitle: '实时物缴数据'
            }
            let items = []
            items = response.data.data
            if (items.length > 0) {
              this.userTabledata.tableData = []
              for (let i = 0; i < items.length; i++) {
                this.userTabledata.tableData.push({
                  '房产名称': items[i].estateName,
                  '业主名称': items[i].houseHoldName,
                  '支付时间': items[i].payTime,
                  '金额（元）': items[i].payAmount
                })
              }
            } else {
              this.userTabledata.tableData = []
            }
          }
        }
      })
    },
    _timeStamp(second_time) {
      var time = parseInt(second_time) + '秒'
      if (parseInt(second_time) > 60) {
        var second = parseInt(second_time) % 60
        var min = parseInt(second_time / 60)
        time = min + '分' + second + '秒'
        if (min > 60) {
          min = parseInt(second_time / 60) % 60
          var hour = parseInt(parseInt(second_time / 60) / 60)
          time = hour + '小时' + min + '分' + second + '秒'
          if (hour > 24) {
            hour = parseInt(parseInt(second_time / 60) / 60) % 24
            var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24)
            time = day + '天' + hour + '小时' + min + '分' + second + '秒'
          }
        }
      }
      return time
    },
    _handelCommunityIds() {
      const data = {
        id: sessionStorage.getItem('userId')
      }
      getUserCommunity(data).then((res) => {
        if (res.data.code === 200) {
          const communityList = res.data.data
          communityList.forEach(v => {
            this.communityIds.push(v.id)
          })
          // 确保 communityList 有值才调用接口
          this.getInOutCountInfo()
          this.getParkingRealTimeInfo()
          this.getParkingChargeInfo()
          this.getComplaintStatusTrend()
          this.getDcInoutFlagType()
          this.getComplaintStatus()
        }
      })
    }
  }
}
</script>

<style scoped>
@import url(../../../static/css/index.css);
.home-bg {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-color: #162238;
}
.header {
  background: #1e2c47;
  margin-bottom: 10px;
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
  animation: mymove 1s ease infinite;
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
@keyframes mymove {
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
  background: #1e2c47;
  margin-bottom: 10px;
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
  content: "";
  display: block;
  clear: both;
}
.navigation li {
  list-style: none;
  float: left;
  width: calc(100% / 7 - 2rem);
  /* display: inline-block; */
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
  background-color: #e94242;
}
.navigation a:nth-child(7) a {
  background-color: #e3a61f;
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
.dataVisual-con-right,
.dataVisual-con-table {
  width: 33.33%;
  margin: 0;
}
.dataVisual-con-table {
  width: 33.33%;
  margin-top: 10px;
}
.dataVisual-con-left .dataVisual-item-t,
.dataVisual-con-center .dataVisual-item-t,
.dataVisual-con-right .dataVisual-item-t {
  padding-bottom: 72%;
}
.dataVisual-con-table .dataVisual-item-t {
  padding-bottom: 50%;
}
</style>
