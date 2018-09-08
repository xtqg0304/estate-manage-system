import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterAsyncRouter(tmp.children, roles)
    }
    hasPermission(roles, tmp) && res.push(tmp)
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    CLEAR_ROUTERS: state => {
      state.addRouters.length = 0
      state.routers = []
      state.routers = state.routers.concat(constantRouterMap)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data // roles的值位数组
        let accessedRouters // 根据角色获取的异步路由表
        if (roles.includes('admin')) {
          // 判断如果是超级管理员，全部的异步路由表
          accessedRouters = asyncRouterMap
        } else {
          // 符合用户角色的，异步路由表
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters) // 设置vuex 路由表
        resolve()
      })
    },
    ClearRoutes({ commit }) {
      return new Promise(resolve => {
        commit('CLEAR_ROUTERS') // 清除 vuex 路由表
        resolve()
      })
    }
  }
}

export default permission
