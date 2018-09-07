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
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'estate']
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin', 'estate']
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission',
          roles: ['admin', 'estate']
        }
      }
    ],
    hidden: true
  },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/index',
    children: [
      {
        path: 'notice',
        component: () => import('@/views/notice/index.vue'),
        name: 'notice',
        meta: {
          title: 'notice',
          icon: 'notice',
          noCache: true,
          roles: ['admin', 'estate']
        }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/index',
    children: [
      {
        path: 'news',
        component: () => import('@/views/news/index.vue'),
        name: 'news',
        meta: {
          title: 'news',
          icon: 'news',
          noCache: true,
          roles: ['admin', 'estate']
        }
      }
    ]
  },
  {
    path: '/repair',
    component: Layout,
    redirect: '/repair/index',
    children: [
      {
        path: 'repair',
        component: () => import('@/views/repair/index.vue'),
        name: 'repair',
        meta: {
          title: 'repair',
          icon: 'repair',
          noCache: true,
          roles: ['admin', 'estate']
        }
      }
    ]
  },
  {
    path: '/advise',
    component: Layout,
    redirect: '/advise/index',
    children: [
      {
        path: 'advise',
        component: () => import('@/views/advise/index.vue'),
        name: 'advise',
        meta: {
          title: 'advise',
          icon: 'advise',
          noCache: true,
          roles: ['admin', 'estate']
        }
      }
    ]
  },
  {
    path: '/phone',
    component: Layout,
    redirect: '/phone/index',
    children: [
      {
        path: 'phone',
        component: () => import('@/views/phone/index.vue'),
        name: 'phone',
        meta: {
          title: 'phone',
          icon: 'phone',
          noCache: true,
          roles: ['admin', 'estate']
        }
      }
    ]
  },
  {
    path: '/estatePay',
    component: Layout,
    redirect: '/estatePay/index',
    children: [
      {
        path: 'estatePay',
        component: () => import('@/views/estatePay/index.vue'),
        name: 'estatePay',
        meta: {
          title: 'estatePay',
          icon: 'estatePay',
          noCache: true,
          roles: ['admin', 'estate']
        }
      }
    ]
  },
  {
    path: '/vehiclePay',
    component: Layout,
    redirect: '/vehiclePay/index',
    children: [
      {
        path: 'vehiclePay',
        component: () => import('@/views/vehiclePay/index.vue'),
        name: 'vehiclePay',
        meta: {
          title: 'vehiclePay',
          icon: 'vehiclePay1',
          noCache: true,
          roles: ['admin', 'estate']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
