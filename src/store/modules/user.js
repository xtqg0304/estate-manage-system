import { loginByUsername, logout } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import {
  getUserCommunity
} from '@/api/communityManage'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    // token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    /* 参数 */
    userId: '',
    trueName: '',
    uuid: '',
    mobile: '',
    email: '',
    token: '',
    platform: '',
    pushUserId: '',
    pushChannelId: '',
    subSystemId: '',
    permission: [],
    communityList: [],
    selectCommunity: '',
    selectCommunityName: ''
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SUBSYSTEMID: (state, id) => {
      state.subSystemId = id
    },
    SET_USER_INFO: (state, user_info) => {
      state.userId = user_info.userId
      state.trueName = user_info.trueName
      state.uuid = user_info.uuid
      state.mobile = user_info.mobile
      state.email = user_info.email
      state.platform = user_info.platform
      state.pushUserId = user_info.pushUserId
      state.pushChannelId = user_info.pushChannelId
      state.permission = user_info.permission
    },
    SET_COMMUNITYLIST: (state, communityList) => {
      state.communityList = communityList
    },
    SET_SELECTCOMMUNITY: (state, selectCommunity) => {
      state.selectCommunity = selectCommunity
    },
    SET_SELECTCOMMUNITYNAME: (state, selectCommunityName) => {
      state.selectCommunityName = selectCommunityName
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            console.log('login response')
            /* eslint-disable */
            console.log(response.headers["x-auth-token"])
            console.log(response.data.data)
            const data = response.data.data
            commit('SET_TOKEN', response.headers["x-auth-token"]) // 设置vuex里面token的值
            commit('SET_USER_INFO', data)
            setToken(response.headers["x-auth-token"]) // 将token的值存储在cookie或者sessionstorage
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户小区列表
    GetUserCommunity({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserCommunity({id: state.userId})
          .then(response => {
            if(response.status === 200){
              if(response.data.code === 200){
                const communityList = response.data.data
                if (communityList && communityList.length > 0) {
                  // 验证返回的communityList是否是一个非空数组
                  commit('SET_COMMUNITYLIST', communityList) // 设置vuex的用户绑定的小区列表值
                  commit('SET_SELECTCOMMUNITY', communityList[0].id) // 设置vuex的默认选中绑定小区的值
                } else {
                  reject('getCommunityList: communityList must be a non-null array !')
                }
              }
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            if (!response.data) {
              // 由于mockjs 不支持自定义状态码只能这样hack
              reject('error')
            }
            const data = response.data

            if (data.roles && data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles) // 设置vuex的角色值
            } else {
              reject('getUserInfo: roles must be a non-null array !')
            }

            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            commit('SET_INTRODUCTION', data.introduction)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then((response) => {
            console.log(response)
            if(response.data.code === 200){
              commit('SET_TOKEN', '')
              // commit('SET_ROLES', [])
              removeToken()
              resolve()
            }else{
              reject(error)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        // removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data)
          resolve()
        })
      })
    }
  }
}

export default user
