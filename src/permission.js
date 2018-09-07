import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) {
    // 路由跳转前 判断是否有token值
    // determine if there has token
    /* has token*/
    // console.log('getToken()')
    // console.log(getToken())
    if (to.path === '/login') {
      // 如果有token值并且进入的是登录页面，直接跳转到home
      next({ path: '/home' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 进入系统任意路由页面（除login）
      // console.log('store.getters.roles.length')
      // console.log(store.getters.roles.length)
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch('GetUserInfo')
          .then(res => {
            // 拉取user_info
            // const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
            // console.log(roles)
            // store.dispatch('GenerateRoutes', { roles }).then(() => {
            //   // 根据roles权限生成可访问的路由表
            //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            // })
            next()
          })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/home' })
            })
          })
      } else {
        if (to.name === 'home') {
          // 判断是首页角色改为admin
          store.dispatch('ClearRoutes').then(() => {
            console.log('clear clear')
            console.log(store.getters.addRouters.length)
          })
          store
            .dispatch('ChangeRoles', 'admin')
            .then(() => {
              const roles = store.getters.roles
              store.dispatch('GenerateRoutes', { roles }).then(() => {
                router.addRoutes(store.getters.addRouters)
                console.log('store.getters.addRouters')
                console.log(store.getters.addRouters.length)
                next({ ...to, replace: true })
              })
            })
            .catch(err => {
              store.dispatch('FedLogOut').then(() => {
                Message.error(err || 'Verification failed, please login again')
                next({ path: '/home' })
              })
            })
        }
        if (to.name === 'Dashboard') {
          // 判断是子系统页面，根据不同的参数角色改为相应的系统的角色
          console.log(to.params.systemName)
          store.dispatch('ClearRoutes').then(() => {
            console.log('clear clear')
            console.log(store.getters.addRouters.length)
          })
          store
            .dispatch('ChangeRoles', to.params.systemName)
            .then(() => {
              const roles = store.getters.roles
              store.dispatch('GenerateRoutes', { roles }).then(() => {
                router.addRoutes(store.getters.addRouters)
                console.log('store.getters.addRouters')
                console.log(store.getters.addRouters.length)
                next({ ...to, replace: true })
              })
            })
            .catch(err => {
              store.dispatch('FedLogOut').then(() => {
                Message.error(err || 'Verification failed, please login again')
                next({ path: '/home' })
              })
            })
        }
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
