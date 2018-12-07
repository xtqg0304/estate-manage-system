import { generateRoutes } from '@/api/login'
import { constantRouterMap, map } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      sessionStorage.setItem('addRouters', JSON.stringify(routers))
      sessionStorage.setItem('permission_routers', JSON.stringify(state.routers))
    },
    CLEAR_ROUTERS: state => {
      state.addRouters.length = 0
      state.routers = []
      state.routers = state.routers.concat(constantRouterMap)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        const appId = data
        generateRoutes(appId)
          .then(response => {
            if (response.status === 200) {
              if (response.data.code === 200) {
                const data = response.data.data
                const resAddRouters = []
                for (let i = 0; i < data.length; i++) {
                  const tempRouter = {}
                  tempRouter.path = JSON.parse(data[i].link).linkPath
                  tempRouter.component = map[JSON.parse(data[i].link).linkComponent]
                  tempRouter.redirect = JSON.parse(data[i].link).linkRedirect
                  tempRouter.name = JSON.parse(data[i].link).linkName
                  if (data[i].status === 'DISABLED') {
                    tempRouter.hidden = true
                  } else {
                    tempRouter.hidden = false
                  }
                  tempRouter.meta = {}
                  tempRouter.meta.title = JSON.parse(data[i].link).linkMetaTitle
                  tempRouter.meta.icon = JSON.parse(data[i].link).linkMetaIcon
                  tempRouter.children = []
                  for (let j = 0; j < data[i].children.length; j++) {
                    const tempSecondRouter = {}
                    tempSecondRouter.path = JSON.parse(data[i].children[j].link).linkPath
                    tempSecondRouter.component = map[JSON.parse(data[i].children[j].link).linkComponent]
                    tempSecondRouter.redirect = JSON.parse(data[i].children[j].link).linkRedirect
                    tempSecondRouter.name = JSON.parse(data[i].children[j].link).linkName
                    if (data[i].children[j].status === 'DISABLED') {
                      tempSecondRouter.hidden = true
                    } else {
                      tempSecondRouter.hidden = false
                    }
                    tempSecondRouter.meta = {}
                    tempSecondRouter.meta.title = JSON.parse(data[i].children[j].link).linkMetaTitle
                    tempSecondRouter.meta.icon = JSON.parse(data[i].children[j].link).linkMetaIcon
                    tempRouter.children.push(tempSecondRouter)
                  }
                  resAddRouters.push(tempRouter)
                }
                resAddRouters.push({ path: '*', redirect: '/404', hidden: true })
                // commit('SET_ROUTERS', asyncRouterMap) // 设置vuex 路由表
                commit('SET_ROUTERS', resAddRouters) // 设置vuex 路由表
              } else {
                reject(response.data.msg)
              }
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
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
