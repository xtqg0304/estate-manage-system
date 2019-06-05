import store from './store'
import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/homeSys' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.communityList.length === 0) {
        // 判断当前用户是否已拉取完 小区 信息
        store
          .dispatch('GetUserCommunity')
          .then(() => {
            // 拉取 小区信息
            if (!sessionStorage.getItem('subSystemId')) {
              // 登录成功  默认设置 物业管理系统 的路由
              const permissionSys = JSON.parse(
                sessionStorage.getItem('permission')
              )
              permissionSys.forEach(v => {
                if (v.name === '物管系统') {
                  store.commit('SET_SUBSYSTEMID', v.id)
                }
              })
            }
            store
              .dispatch('GenerateRoutes', sessionStorage.getItem('subSystemId'))
              .then(() => {
                // 根据 子系统id权限生成可访问的路由表
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                next({ ...to, replace: true }) // hack 方法 确保 addRoutes 已完成 ,set the replace: true so the navigation will not leave a history record
              })
          })
          .catch(err => {
            store.dispatch('LogOut').then(() => {
              Message.error(
                err || '用户没有绑定小区,请绑定至少一个小区后,重新登录!'
              )
              next({ path: '/login' })
            })
          })
      } else {
        store
          .dispatch('GenerateRoutes', sessionStorage.getItem('subSystemId'))
          .then(() => {
            // 根据 子系统id 权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack 方法 确保 addRoutes 已完成 ,set the replace: true so the navigation will not leave a history record
          })
        // 没有动态改变权限的需求可直接 next() 删除下方权限判断 ↓
        if (
          hasPermission([sessionStorage.getItem('subSystemId')], to.meta.roles)
        ) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
