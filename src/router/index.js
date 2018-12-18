import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/home'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/home'),
    redirect: 'home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: '智慧社区云', icon: 'logo', noCache: true }
      }
    ],
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard/:systemName',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ],
    hidden: true
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const map = {
  laoutComponet: Layout,
  appSet: () => import('@/views/cloudControl/appManage/appSet.vue'),
  navDefine: () => import('@/views/cloudControl/appManage/navDefine.vue'),
  noticeIndex: () => import('@/views/estateManage/notice/index'),
  repairIndex: () => import('@/views/estateManage/repair/index'),
  adviseIndex: () => import('@/views/estateManage/advise/index'),
  phoneIndex: () => import('@/views/estateManage/phone/index'),
  news: () => import('@/views/estateManage/news/news.vue'),
  partyBuilding: () => import('@/views/estateManage/news/partyBuilding.vue'),
  commonSense: () => import('@/views/estateManage/news/commonSense.vue'),
  localNews: () => import('@/views/estateManage/news/localNews.vue'),
  rollPicture: () => import('@/views/estateManage/news/rollPicture.vue'),
  bill: () => import('@/views/payManage/estatePay/bill.vue'),
  record: () => import('@/views/payManage/estatePay/record.vue'),
  detail: () => import('@/views/payManage/estatePay/detail.vue'),
  monthlybill: () => import('@/views/payManage/vehiclePay/monthlybill.vue'),
  monthlymoney: () => import('@/views/payManage/vehiclePay/monthlymoney.vue'),
  deviceManage: () => import('@/views/doorManage/deviceManage/deviceManage.vue'),
  openLog: () => import('@/views/doorManage/deviceManage/openLog.vue'),
  keyManage: () => import('@/views/doorManage/keyManage/keyManage.vue'),
  presentVehicle: () => import('@/views/vehicleManage/realtimeInOut/presentVehicle.vue'),
  vehicleInOut: () => import('@/views/vehicleManage/realtimeInOut/vehicleInOut.vue'),
  abnormalLiftrod: () => import('@/views/vehicleManage/realtimeInOut/abnormalLiftrod.vue'),
  monthlyPayment: () => import('@/views/vehicleManage/payRecord/monthlyPayment.vue'),
  tempstopPayment: () => import('@/views/vehicleManage/payRecord/tempstopPayment.vue'),
  parkPayDaily: () => import('@/views/vehicleManage/statisticalAnalysis/parkPayDaily.vue'),
  parkPayMonthly: () => import('@/views/vehicleManage/statisticalAnalysis/parkPayMonthly.vue'),
  sentryboxPayDaily: () => import('@/views/vehicleManage/statisticalAnalysis/sentryboxPayDaily.vue'),
  parkSetting: () => import('@/views/vehicleManage/parkManage/parkSetting.vue'),
  parkInfo: () => import('@/views/vehicleManage/parkManage/parkInfo.vue'),
  laneSetting: () => import('@/views/vehicleManage/parkManage/laneSetting.vue'),
  parkCashier: () => import('@/views/vehicleManage/parkManage/parkCashier.vue'),
  sentryboxInfo: () => import('@/views/vehicleManage/parkManage/sentryboxInfo.vue'),
  monthlyMembers: () => import('@/views/vehicleManage/parkManage/monthlyMembers.vue'),
  monthlyPackages: () => import('@/views/vehicleManage/parkManage/monthlyPackages.vue'),
  shiftRecord: () => import('@/views/vehicleManage/logQuery/shiftRecord.vue'),
  abnormalAlarm: () => import('@/views/vehicleManage/logQuery/abnormalAlarm.vue'),
  estatePaymentBill: () => import('@/views/statisticalReportManage/estatePayment/estatePaymentBill.vue'),
  estatePaymentOrder: () => import('@/views/statisticalReportManage/estatePayment/estatePaymentOrder.vue'),
  parkPaymentBill: () => import('@/views/statisticalReportManage/parkPayment/parkPaymentBill.vue'),
  parkPaymentOrder: () => import('@/views/statisticalReportManage/parkPayment/parkPaymentOrder.vue'),
  estatePaymentMonthly: () => import('@/views/statisticalReportManage/paymentStatistical/estatePaymentMonthly.vue'),
  parkPaymentDaily: () => import('@/views/statisticalReportManage/paymentStatistical/parkPaymentDaily.vue'),
  parkPaymentMonthly: () => import('@/views/statisticalReportManage/paymentStatistical/parkPaymentMonthly.vue'),
  groupDetail: () => import('@/views/groupSetting/groupManage/groupDetail.vue'),
  areaSetting: () => import('@/views/groupSetting/groupManage/areaSetting.vue'),
  communitySetting: () => import('@/views/groupSetting/groupManage/communitySetting.vue'),
  positionRole: () => import('@/views/groupSetting/staffManage/positionRole.vue'),
  staffAccount: () => import('@/views/groupSetting/staffManage/staffAccount.vue'),
  publicAccount: () => import('@/views/groupSetting/wechatManage/publicAccount.vue'),
  smallProject: () => import('@/views/groupSetting/wechatManage/smallProject.vue'),
  message: () => import('@/views/groupSetting/wechatManage/message.vue'),
  sendRecord: () => import('@/views/groupSetting/shortMessageManage/sendRecord.vue'),
  useStatistical: () => import('@/views/groupSetting/shortMessageManage/useStatistical.vue'),
  propertyInfo: () => import('@/views/communitySetting/communityManage/propertyInfo.vue'),
  propertyImport: () => import('@/views/communitySetting/communityManage/propertyImport.vue'),
  householdInfo: () => import('@/views/communitySetting/communityManage/householdInfo.vue'),
  householdImport: () => import('@/views/communitySetting/communityManage/householdImport.vue')

}

export const asyncRouterMap = [
  {
    path: '/cloudControl/appManage',
    component: Layout,
    redirect: '/cloudControl/appManage/appSet.vue',
    name: 'appManage',
    meta: {
      title: 'appManage',
      icon: 'guide',
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'appSet',
        component: () => import('@/views/cloudControl/appManage/appSet.vue'),
        name: 'appSet',
        meta: {
          title: 'appSet',
          icon: 'guide',
          noCache: true,
          roles: ['estate']
        }
      },
      {
        path: 'navDefine',
        component: () => import('@/views/cloudControl/appManage/navDefine.vue'),
        name: 'navDefine',
        meta: {
          title: 'navDefine',
          icon: 'guide',
          noCache: true,
          roles: ['estate']
        }
      }
    ]
  },
  {
    path: '/estateManage/notice',
    component: Layout,
    redirect: '/estateManage/notice/index',
    name: 'noticeManage',
    meta: {
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/estateManage/notice/index'),
        name: 'Notice',
        meta: {
          title: 'notice',
          icon: 'notice',
          noCache: true,
          roles: ['estate']
        }
      }
    ]
  },
  {
    path: '/estateManage/repair',
    component: Layout,
    redirect: '/estateManage/repair/index',
    name: 'repairManage',
    meta: {
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/estateManage/repair/index'),
        name: 'Repair',
        meta: {
          title: 'repair',
          icon: 'repair',
          noCache: true,
          roles: ['estate']
        }
      }
    ]
  },
  {
    path: '/estateManage/advise',
    component: Layout,
    redirect: '/estateManage/advise/index',
    name: 'adviseManage',
    meta: {
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/estateManage/advise/index'),
        name: 'Advise',
        meta: {
          title: 'advise',
          icon: 'advise',
          noCache: true,
          roles: ['estate']
        }
      }
    ]
  },
  {
    path: '/estateManage/phone',
    component: Layout,
    redirect: '/estateManage/phone/index',
    name: 'phoneManage',
    meta: {
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/estateManage/phone/index'),
        name: 'Phone',
        meta: {
          title: 'phone',
          icon: 'phone',
          noCache: true,
          roles: ['estate']
        }
      }
    ]
  },
  {
    path: '/estateManage/newsManage',
    component: Layout,
    redirect: '/estateManage/news/news.vue',
    name: 'newsManage',
    meta: {
      title: 'newsManage',
      icon: 'news',
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'news',
        component: () => import('@/views/estateManage/news/news.vue'),
        name: 'News',
        meta: {
          title: 'news',
          icon: 'news',
          noCache: true,
          roles: ['estate']
        }
      },
      {
        path: 'partyBuilding',
        component: () => import('@/views/estateManage/news/partyBuilding.vue'),
        name: 'partBuilding',
        meta: {
          title: 'partyBuilding',
          icon: 'partyBuilding',
          noCache: true,
          roles: ['estate']
        }
      },
      {
        path: 'commonSense',
        component: () => import('@/views/estateManage/news/commonSense.vue'),
        name: 'commonSense',
        meta: {
          title: 'commonSense',
          icon: 'commonSense',
          noCache: true,
          roles: ['estate']
        }
      },
      {
        path: 'localNews',
        component: () => import('@/views/estateManage/news/localNews.vue'),
        name: 'localNews',
        meta: {
          title: 'localNews',
          icon: 'localNews',
          noCache: true,
          roles: ['estate']
        }
      },
      {
        path: 'rollPicture',
        component: () => import('@/views/estateManage/news/rollPicture.vue'),
        name: 'rollPicture',
        meta: {
          title: 'rollPicture',
          icon: 'rollPicture',
          noCache: true,
          roles: ['estate']
        }
      }
    ]
  },
  {
    path: '/payManage/estatePay',
    component: Layout,
    redirect: '/payManage/estatePay/bill.vue',
    name: 'estatePay',
    meta: {
      title: 'estatePay',
      icon: 'estatePay',
      roles: ['pay']
    },
    children: [
      {
        path: 'bill',
        component: () => import('@/views/payManage/estatePay/bill.vue'),
        name: 'paybill',
        meta: {
          title: 'paybill',
          icon: 'paybill',
          noCache: true,
          roles: ['pay']
        }
      },
      {
        path: 'record',
        component: () => import('@/views/payManage/estatePay/record.vue'),
        name: 'payrecord',
        meta: {
          title: 'payrecord',
          icon: 'payrecord',
          noCache: true,
          roles: ['pay']
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/payManage/estatePay/detail.vue'),
        name: 'paydetail',
        meta: {
          title: 'paydetail',
          icon: 'paydetail',
          noCache: true,
          roles: ['pay']
        }
      }
    ]
  },
  {
    path: '/payManage/vehiclePay',
    component: Layout,
    redirect: '/payManage/vehiclePay/monthlybill.vue',
    name: 'vehiclePay',
    meta: {
      title: 'vehiclePay',
      icon: 'vehiclePay1',
      roles: ['pay']
    },
    children: [
      {
        path: 'monthlybill',
        component: () => import('@/views/payManage/vehiclePay/monthlybill.vue'),
        name: 'paymonthly',
        meta: {
          title: 'paymonthly',
          icon: 'paymonthly',
          noCache: true,
          roles: ['pay']
        }
      },
      {
        path: 'monthlymoney',
        component: () => import('@/views/payManage/vehiclePay/monthlymoney.vue'),
        name: 'paymoney',
        meta: {
          title: 'paymoney',
          icon: 'paymoney',
          noCache: true,
          roles: ['pay']
        }
      }
    ]
  },
  {
    path: '/doorManage/deviceManage',
    component: Layout,
    redirect: '/doorManage/deviceManage/deviceManage.vue',
    name: 'DeviceManage',
    meta: {
      title: 'deviceManage',
      icon: 'deviceManage',
      roles: ['door']
    },
    children: [
      {
        path: 'deviceManage',
        component: () => import('@/views/doorManage/deviceManage/deviceManage.vue'),
        name: 'deviceManage',
        meta: {
          title: 'deviceManage',
          icon: 'deviceManage',
          noCache: true,
          roles: ['door']
        }
      },
      {
        path: 'openLog',
        component: () => import('@/views/doorManage/deviceManage/openLog.vue'),
        name: 'openLog',
        meta: {
          title: 'openLog',
          icon: 'openLog',
          noCache: true,
          roles: ['door']
        }
      }
    ]
  },
  {
    path: '/doorManage/keyManage',
    component: Layout,
    redirect: '/doorManage/keyManage/keyManage.vue',
    name: 'KeyManage',
    meta: {
      title: 'keyManage',
      icon: 'keyManage',
      roles: ['door']
    },
    children: [
      {
        path: 'keyManage',
        component: () => import('@/views/doorManage/keyManage/keyManage.vue'),
        name: 'keyManage',
        meta: {
          title: 'keyManage',
          icon: 'keyManage',
          noCache: true,
          roles: ['door']
        }
      }
    ]
  },
  {
    path: '/vehicleManage/realtimeInOut',
    component: Layout,
    redirect: '/vehicleManage/realtimeInOut/presentVehicle.vue',
    name: 'realtimeInOut',
    meta: {
      title: 'realtimeInOut',
      icon: 'realtimeInOut',
      roles: ['vehicle']
    },
    children: [
      {
        path: 'presentVehicle',
        component: () => import('@/views/vehicleManage/realtimeInOut/presentVehicle.vue'),
        name: 'presentVehicle',
        meta: {
          title: 'presentVehicle',
          icon: 'presentVehicle',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'vehicleInOut',
        component: () => import('@/views/vehicleManage/realtimeInOut/vehicleInOut.vue'),
        name: 'vehicleInOut',
        meta: {
          title: 'vehicleInOut',
          icon: 'vehicleInOut',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'abnormalLiftrod',
        component: () => import('@/views/vehicleManage/realtimeInOut/abnormalLiftrod.vue'),
        name: 'abnormalLiftrod',
        meta: {
          title: 'abnormalLiftrod',
          icon: 'abnormalLiftrod',
          noCache: true,
          roles: ['vehicle']
        }
      }
    ]
  },
  {
    path: '/vehicleManage/payRecord',
    component: Layout,
    redirect: '/vehicleManage/payRecord/monthlyPayment.vue',
    name: 'payRecord',
    meta: {
      title: 'payRecord',
      icon: 'payrecord',
      roles: ['vehicle']
    },
    children: [
      {
        path: 'monthlyPayment',
        component: () => import('@/views/vehicleManage/payRecord/monthlyPayment.vue'),
        name: 'monthlyPayment',
        meta: {
          title: 'monthlyPayment',
          icon: 'paymonthly',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'tempstopPayment',
        component: () => import('@/views/vehicleManage/payRecord/tempstopPayment.vue'),
        name: 'tempstopPayment',
        meta: {
          title: 'tempstopPayment',
          icon: 'paymoney',
          noCache: true,
          roles: ['vehicle']
        }
      }
    ]
  },
  {
    path: '/vehicleManage/statisticalAnalysis',
    component: Layout,
    redirect: '/vehicleManage/statisticalAnalysis/parkPayDaily.vue',
    name: 'statisticalAnalysis',
    meta: {
      title: 'statisticalAnalysis',
      icon: 'statisticalAnalysis',
      roles: ['vehicle']
    },
    children: [
      {
        path: 'parkPayDaily',
        component: () => import('@/views/vehicleManage/statisticalAnalysis/parkPayDaily.vue'),
        name: 'parkPayDaily',
        meta: {
          title: 'parkPayDaily',
          icon: 'parkPayDaily',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'parkPayMonthly',
        component: () => import('@/views/vehicleManage/statisticalAnalysis/parkPayMonthly.vue'),
        name: 'parkPayMonthly',
        meta: {
          title: 'parkPayMonthly',
          icon: 'parkPayMonthly',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'sentryboxPayDaily',
        component: () => import('@/views/vehicleManage/statisticalAnalysis/sentryboxPayDaily.vue'),
        name: 'sentryboxPayDaily',
        meta: {
          title: 'sentryboxPayDaily',
          icon: 'sentryboxPayDaily',
          noCache: true,
          roles: ['vehicle']
        }
      }
    ]
  },
  {
    path: '/vehicleManage/parkManage',
    component: Layout,
    redirect: '/vehicleManage/parkManage/parkInfo.vue',
    name: 'parkManage',
    meta: {
      title: 'parkManage',
      icon: 'parkManage',
      roles: ['vehicle']
    },
    children: [
      {
        path: 'parkSetting',
        component: () => import('@/views/vehicleManage/parkManage/parkSetting.vue'),
        name: 'parkSetting',
        meta: {
          title: 'parkSetting',
          icon: 'parkManage',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'parkInfo',
        component: () => import('@/views/vehicleManage/parkManage/parkInfo.vue'),
        name: 'parkInfo',
        meta: {
          title: 'parkInfo',
          icon: 'parkInfo',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'laneSetting',
        component: () => import('@/views/vehicleManage/parkManage/laneSetting.vue'),
        name: 'laneSetting',
        meta: {
          title: 'laneSetting',
          icon: 'laneSetting',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'parkCashier',
        component: () => import('@/views/vehicleManage/parkManage/parkCashier.vue'),
        name: 'parkCashier',
        meta: {
          title: 'parkCashier',
          icon: 'parkCashier',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'sentryboxInfo',
        component: () => import('@/views/vehicleManage/parkManage/sentryboxInfo.vue'),
        name: 'sentryboxInfo',
        meta: {
          title: 'sentryboxInfo',
          icon: 'parkInfo',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'monthlyMembers',
        component: () => import('@/views/vehicleManage/parkManage/monthlyMembers.vue'),
        name: 'monthlyMembers',
        meta: {
          title: 'monthlyMembers',
          icon: 'monthlyMembers',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'monthlyPackages',
        component: () => import('@/views/vehicleManage/parkManage/monthlyPackages.vue'),
        name: 'monthlyPackages',
        meta: {
          title: 'monthlyPackages',
          icon: 'monthlyPackages',
          noCache: true,
          roles: ['vehicle']
        }
      }
    ]
  },
  {
    path: '/vehicleManage/logQuery',
    component: Layout,
    redirect: '/vehicleManage/logQuery/shiftRecord.vue',
    name: 'logQuery',
    meta: {
      title: 'logQuery',
      icon: 'openLog',
      roles: ['vehicle']
    },
    children: [
      {
        path: 'shiftRecord',
        component: () => import('@/views/vehicleManage/logQuery/shiftRecord.vue'),
        name: 'shiftRecord',
        meta: {
          title: 'shiftRecord',
          icon: 'shiftRecord',
          noCache: true,
          roles: ['vehicle']
        }
      },
      {
        path: 'abnormalAlarm',
        component: () => import('@/views/vehicleManage/logQuery/abnormalAlarm.vue'),
        name: 'abnormalAlarm',
        meta: {
          title: 'abnormalAlarm',
          icon: 'abnormalAlarm',
          noCache: true,
          roles: ['vehicle']
        }
      }
    ]
  },
  {
    path: '/statisticalReportManage/estatePayment',
    component: Layout,
    redirect: '/statisticalReportManage/estatePayment/estatePaymentBill.vue',
    name: 'estatePayment',
    meta: {
      title: 'estatePayment',
      icon: 'estatePay',
      roles: ['statisticalReport']
    },
    children: [
      {
        path: 'estatePaymentBill',
        component: () => import('@/views/statisticalReportManage/estatePayment/estatePaymentBill.vue'),
        name: 'estatePaymentBill',
        meta: {
          title: 'estatePaymentBill',
          icon: 'paybill',
          noCache: true,
          roles: ['statisticalReport']
        }
      },
      {
        path: 'estatePaymentOrder',
        component: () => import('@/views/statisticalReportManage/estatePayment/estatePaymentOrder.vue'),
        name: 'estatePaymentOrder',
        meta: {
          title: 'estatePaymentOrder',
          icon: 'payrecord',
          noCache: true,
          roles: ['statisticalReport']
        }
      }
    ]
  },
  {
    path: '/statisticalReportManage/parkPayment',
    component: Layout,
    redirect: '/statisticalReportManage/parkPayment/parkPaymentBill.vue',
    name: 'parkPayment',
    meta: {
      title: 'parkPayment',
      icon: 'vehiclePay1',
      roles: ['statisticalReport']
    },
    children: [
      {
        path: 'parkPaymentBill',
        component: () => import('@/views/statisticalReportManage/parkPayment/parkPaymentBill.vue'),
        name: 'parkPaymentBill',
        meta: {
          title: 'parkPaymentBill',
          icon: 'paymonthly',
          noCache: true,
          roles: ['statisticalReport']
        }
      },
      {
        path: 'parkPaymentOrder',
        component: () => import('@/views/statisticalReportManage/parkPayment/parkPaymentOrder.vue'),
        name: 'parkPaymentOrder',
        meta: {
          title: 'parkPaymentOrder',
          icon: 'paymoney',
          noCache: true,
          roles: ['statisticalReport']
        }
      }
    ]
  },
  {
    path: '/statisticalReportManage/paymentStatistical',
    component: Layout,
    redirect: '/statisticalReportManage/paymentStatistical/estatePaymentMonthly.vue',
    name: 'paymentStatistical',
    meta: {
      title: 'paymentStatistical',
      icon: 'statisticalAnalysis',
      roles: ['statisticalReport']
    },
    children: [
      {
        path: 'estatePaymentMonthly',
        component: () => import('@/views/statisticalReportManage/paymentStatistical/estatePaymentMonthly.vue'),
        name: 'estatePaymentMonthly',
        meta: {
          title: 'estatePaymentMonthly',
          icon: 'sentryboxPayDaily',
          noCache: true,
          roles: ['statisticalReport']
        }
      },
      {
        path: 'parkPaymentDaily',
        component: () => import('@/views/statisticalReportManage/paymentStatistical/parkPaymentDaily.vue'),
        name: 'parkPaymentDaily',
        meta: {
          title: 'parkPaymentDaily',
          icon: 'parkPayDaily',
          noCache: true,
          roles: ['statisticalReport']
        }
      },
      {
        path: 'parkPaymentMonthly',
        component: () => import('@/views/statisticalReportManage/paymentStatistical/parkPaymentMonthly.vue'),
        name: 'parkPaymentMonthly',
        meta: {
          title: 'parkPaymentMonthly',
          icon: 'parkPayMonthly',
          noCache: true,
          roles: ['statisticalReport']
        }
      }
    ]
  },
  {
    path: '/groupSetting/groupManage',
    component: Layout,
    redirect: '/groupSetting/groupManage/groupDetail.vue',
    name: 'groupManage',
    meta: {
      title: 'groupManage',
      icon: 'groupManage',
      roles: ['groupSetting']
    },
    children: [
      {
        path: 'groupDetail',
        component: () => import('@/views/groupSetting/groupManage/groupDetail.vue'),
        name: 'groupDetail',
        meta: {
          title: 'groupDetail',
          icon: 'groupDetail',
          noCache: true,
          roles: ['groupSetting']
        }
      },
      {
        path: 'areaSetting',
        component: () => import('@/views/groupSetting/groupManage/areaSetting.vue'),
        name: 'areaSetting',
        meta: {
          title: 'areaSetting',
          icon: 'areaSetting',
          noCache: true,
          roles: ['groupSetting']
        }
      },
      {
        path: 'communitySetting',
        component: () => import('@/views/groupSetting/groupManage/communitySetting.vue'),
        name: 'communitySetting',
        meta: {
          title: 'communitySetting',
          icon: 'communitySetting',
          noCache: true,
          roles: ['groupSetting']
        }
      }
    ]
  },
  {
    path: '/groupSetting/staffManage',
    component: Layout,
    redirect: '/groupSetting/staffManage/positionRole.vue',
    name: 'staffManage',
    meta: {
      title: 'staffManage',
      icon: 'staffManage',
      roles: ['groupSetting']
    },
    children: [
      {
        path: 'positionRole',
        component: () => import('@/views/groupSetting/staffManage/positionRole.vue'),
        name: 'positionRole',
        meta: {
          title: 'positionRole',
          icon: 'positionRole',
          noCache: true,
          roles: ['groupSetting']
        }
      },
      {
        path: 'staffAccount',
        component: () => import('@/views/groupSetting/staffManage/staffAccount.vue'),
        name: 'staffAccount',
        meta: {
          title: 'staffAccount',
          icon: 'staffAccount',
          noCache: true,
          roles: ['groupSetting']
        }
      }
    ]
  },
  {
    path: '/groupSetting/wechatManage',
    component: Layout,
    redirect: '/groupSetting/wechatManage/publicAccount.vue',
    name: 'wechatManage',
    meta: {
      title: 'wechatManage',
      icon: 'publicAccount',
      roles: ['groupSetting']
    },
    children: [
      {
        path: 'publicAccount',
        component: () => import('@/views/groupSetting/wechatManage/publicAccount.vue'),
        name: 'publicAccount',
        meta: {
          title: 'publicAccount',
          icon: 'publicAccount',
          noCache: true,
          roles: ['groupSetting']
        }
      },
      {
        path: 'smallProject',
        component: () => import('@/views/groupSetting/wechatManage/smallProject.vue'),
        name: 'smallProject',
        meta: {
          title: 'smallProject',
          icon: 'publicAccount',
          noCache: true,
          roles: ['groupSetting']
        }
      },
      {
        path: 'message',
        component: () => import('@/views/groupSetting/wechatManage/message.vue'),
        name: 'message',
        meta: {
          title: 'smallProject',
          icon: 'publicAccount',
          noCache: true,
          roles: ['groupSetting']
        }
      }
    ]
  },
  // {
  //   path: '/groupSetting/shortMessageManage',
  //   component: Layout,
  //   redirect: '/groupSetting/shortMessageManage/sendRecord.vue',
  //   name: 'shortMessageManage',
  //   meta: {
  //     title: 'shortMessageManage',
  //     icon: 'shortMessageManage',
  //     roles: ['groupSetting']
  //   },
  //   children: [
  //     {
  //       path: 'sendRecord',
  //       component: () => import('@/views/groupSetting/shortMessageManage/sendRecord.vue'),
  //       name: 'sendRecord',
  //       meta: {
  //         title: 'sendRecord',
  //         icon: 'sendRecord',
  //         noCache: true,
  //         roles: ['groupSetting']
  //       }
  //     },
  //     {
  //       path: 'useStatistical',
  //       component: () => import('@/views/groupSetting/shortMessageManage/useStatistical.vue'),
  //       name: 'useStatistical',
  //       meta: {
  //         title: 'useStatistical',
  //         icon: 'useStatistical',
  //         noCache: true,
  //         roles: ['groupSetting']
  //       }
  //     }
  //   ]
  // },
  {
    path: '/communitySetting/communityManage',
    component: Layout,
    redirect: '/communitySetting/communityManage/propertyInfo.vue',
    name: 'communityManage',
    meta: {
      title: 'communityManage',
      icon: 'communitySetting',
      roles: ['communitySetting']
    },
    children: [
      {
        path: 'propertyInfo',
        component: () => import('@/views/communitySetting/communityManage/propertyInfo.vue'),
        name: 'propertyInfo',
        meta: {
          title: 'propertyInfo',
          icon: 'propertyInfo',
          noCache: true,
          roles: ['communitySetting']
        }
      },
      {
        path: 'propertyImport',
        component: () => import('@/views/communitySetting/communityManage/propertyImport.vue'),
        name: 'propertyImport',
        meta: {
          title: 'propertyImport',
          icon: 'import',
          noCache: true,
          roles: ['communitySetting']
        }
      },
      {
        path: 'householdInfo',
        component: () => import('@/views/communitySetting/communityManage/householdInfo.vue'),
        name: 'householdInfo',
        meta: {
          title: 'householdInfo',
          icon: 'householdInfo',
          noCache: true,
          roles: ['communitySetting']
        }
      },
      {
        path: 'householdImport',
        component: () => import('@/views/communitySetting/communityManage/householdImport.vue'),
        name: 'householdImport',
        meta: {
          title: 'householdImport',
          icon: 'import',
          noCache: true,
          roles: ['communitySetting']
        }
      }
    ]
  },
  // {
  //   path: '/communitySetting/staffManage',
  //   component: Layout,
  //   redirect: '/communitySetting/staffManage/positionRole.vue',
  //   meta: {
  //     title: 'staffManage',
  //     icon: 'staffManage',
  //     roles: ['communitySetting']
  //   },
  //   children: [
  //     {
  //       path: 'positionRole',
  //       component: () => import('@/views/communitySetting/staffManage/positionRole.vue'),
  //       name: 'positionRole',
  //       meta: {
  //         title: 'positionRole',
  //         icon: 'positionRole',
  //         noCache: true,
  //         roles: ['communitySetting']
  //       }
  //     },
  //     {
  //       path: 'staffAccount',
  //       component: () => import('@/views/communitySetting/staffManage/staffAccount.vue'),
  //       name: 'staffAccount',
  //       meta: {
  //         title: 'staffAccount',
  //         icon: 'staffAccount',
  //         noCache: true,
  //         roles: ['communitySetting']
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/communitySetting/shortMessageManage',
  //   component: Layout,
  //   redirect: '/communitySetting/shortMessageManage/sendRecord.vue',
  //   name: 'shortMessageManage',
  //   meta: {
  //     title: 'shortMessageManage',
  //     icon: 'shortMessageManage',
  //     roles: ['communitySetting']
  //   },
  //   children: [
  //     {
  //       path: 'sendRecord',
  //       component: () => import('@/views/communitySetting/shortMessageManage/sendRecord.vue'),
  //       name: 'sendRecord',
  //       meta: {
  //         title: 'sendRecord',
  //         icon: 'sendRecord',
  //         noCache: true,
  //         roles: ['communitySetting']
  //       }
  //     },
  //     {
  //       path: 'useStatistical',
  //       component: () => import('@/views/communitySetting/shortMessageManage/useStatistical.vue'),
  //       name: 'useStatistical',
  //       meta: {
  //         title: 'useStatistical',
  //         icon: 'useStatistical',
  //         noCache: true,
  //         roles: ['communitySetting']
  //       }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
