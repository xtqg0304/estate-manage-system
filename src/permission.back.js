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
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/home' })
      NProgress.done()
    } else if (to.path === '/home') {
      console.log(
        '/home  store.getters.roles.length = ' + store.getters.roles.length
      )
      if (store.getters.addRouters.length !== 0) {
        store.dispatch('ClearRoutes').then(() => {
          console.log('ClearRoutes' + store.getters.addRouters.length)
        })
      } else {
        console.log(
          'store.getters.addRouters.length = ' + store.getters.addRouters.length
        )
      }
      store
        .dispatch('GetUserInfo')
        .then(res => {
          console.log('登录时的角色为')
          console.log(res.data.roles)
          store
            .dispatch('ChangeRoles', 'admin')
            .then(() => {
              console.log('改变后首页的角色')
              console.log(store.getters.roles)
              // const roles = store.getters.roles
              // store.dispatch('GenerateRoutes', { roles }).then(() => {
              //   router.addRoutes(store.getters.addRouters)
              //   console.log(
              //     '改变后首页 store.getters.addRouters = ' +
              //       store.getters.addRouters.length
              //   )
              //   console.log(store.getters.addRouters)
              //   next({ ...to, replace: true })
              // })
              next()
            })
            .catch(err => {
              store.dispatch('FedLogOut').then(() => {
                Message.error(err || 'Verification failed, please login again')
                next({ path: '/login' })
              })
            })
          next()
        })
        .catch(err => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/login' })
          })
        })
    } else if (to.path.indexOf('dashboard') > 0) {
      console.log('Dashboard')
      console.log(store.getters.roles)
      // 判断是子系统页面，根据不同的参数角色改为相应的系统的角色
      if (store.getters.addRouters.length !== 0) {
        store.dispatch('ClearRoutes').then(() => {
          console.log(
            'Dashboard===ClearRoutes == ' + store.getters.addRouters.length
          )
        })
      }
      store
        .dispatch('GetUserInfo')
        .then(res => {
          console.log('进入dashboard时的角色为' + res.data.roles[0])
          store
            .dispatch('ChangeRoles', to.params.systemName)
            .then(() => {
              console.log('改变后dashboard的角色' + store.getters.roles)
              const roles = store.getters.roles
              store.dispatch('GenerateRoutes', { roles }).then(() => {
                router.addRoutes(store.getters.addRouters)
                console.log(
                  '改变后 dashboard store.getters.addRouters = ' +
                    store.getters.addRouters.length
                )
                console.log(store.getters.addRouters)
                next({ ...to, replace: true })
              })
            })
            .catch(err => {
              store.dispatch('FedLogOut').then(() => {
                Message.error(err || 'Verification failed, please login again')
                next({ path: '/login' })
              })
            })
          next()
        })
        .catch(err => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/login' })
          })
        })
    } else {
      // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      if (hasPermission(store.getters.roles, to.meta.roles)) {
        next()
      } else {
        next({ path: '/401', replace: true, query: { noGoBack: true }})
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
