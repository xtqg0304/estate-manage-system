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

export const asyncRouterMap = [
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/index',
    meta: {
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/notice/index'),
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
    path: '/news',
    component: Layout,
    redirect: '/news/index',
    meta: {
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/index'),
        name: 'News',
        meta: {
          title: 'news',
          icon: 'news',
          noCache: true,
          roles: ['estate']
        }
      }
    ]
  },
  {
    path: '/repair',
    component: Layout,
    redirect: '/repair/index',
    meta: {
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/repair/index'),
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
    path: '/advise',
    component: Layout,
    redirect: '/advise/index',
    meta: {
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/advise/index'),
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
    path: '/phone',
    component: Layout,
    redirect: '/phone/index',
    meta: {
      roles: ['admin', 'estate', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/phone/index'),
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
    path: '/estatePay',
    component: Layout,
    redirect: '/estatePay/bill.vue',
    meta: {
      title: 'estatePay',
      icon: 'estatePay',
      roles: ['pay']
    },
    children: [
      {
        path: 'bill',
        component: () => import('@/views/estatePay/bill.vue'),
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
        component: () => import('@/views/estatePay/record.vue'),
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
        component: () => import('@/views/estatePay/detail.vue'),
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
    path: '/vehiclePay',
    component: Layout,
    redirect: '/vehiclePay/monthlybill.vue',
    meta: {
      title: 'vehiclePay',
      icon: 'vehiclePay1',
      roles: ['pay']
    },
    children: [
      {
        path: 'monthlybill',
        component: () => import('@/views/vehiclePay/monthlybill.vue'),
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
        component: () => import('@/views/vehiclePay/monthlymoney.vue'),
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
  { path: '*', redirect: '/404', hidden: true }
]
