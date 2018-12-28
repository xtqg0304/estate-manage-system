import { loginByUsername, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {
  getUserCommunity
} from '@/api/communityManage'
import {
  getBuildingList,
  getRoomList
} from '@/api/property'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
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
    token: getToken(),
    platform: '',
    pushUserId: '',
    pushChannelId: '',
    subSystemId: '',
    permission: [],
    communityList: [],
    selectCommunity: '',
    selectCommunityName: '',
    roomList: []

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
      sessionStorage.setItem('subSystemId', id)
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
      sessionStorage.setItem('userId', user_info.userId)
      sessionStorage.setItem('trueName', user_info.trueName)
      sessionStorage.setItem('uuid', user_info.uuid)
      sessionStorage.setItem('mobile', user_info.mobile)
      sessionStorage.setItem('email', user_info.email)
      sessionStorage.setItem('platform', user_info.platform)
      sessionStorage.setItem('pushUserId', user_info.pushUserId)
      sessionStorage.setItem('pushChannelId', user_info.pushChannelId)
      sessionStorage.setItem('permission', JSON.stringify(user_info.permission))
      // sessionStorage.setItem('user_info', JSON.stringify(user_info))
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
      sessionStorage.setItem('userId', userId)
    },
    SET_TRUENAME: (state, trueName) => {
      state.trueName = trueName
      sessionStorage.setItem('trueName', trueName)
    },
    SET_UUID: (state, uuid) => {
      state.uuid = uuid
      sessionStorage.setItem('uuid', uuid)
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile
      sessionStorage.setItem('mobile', mobile)
    },
    SET_EMAIL: (state, email) => {
      state.email = email
      sessionStorage.setItem('email', email)
    },
    SET_PLATFORM: (state, platform) => {
      state.platform = platform
      sessionStorage.setItem('platform', platform)
    },
    SET_PUSHUSERID: (state, pushUserId) => {
      state.pushUserId = pushUserId
      sessionStorage.setItem('pushUserId', pushUserId)
    },
    SET_PUSHCHANNELID: (state, pushChannelId) => {
      state.pushChannelId = pushChannelId
      sessionStorage.setItem('pushChannelId', pushChannelId)
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission
      sessionStorage.setItem('permission', JSON.stringify(permission))
    },
    SET_COMMUNITYLIST: (state, communityList) => {
      state.communityList = communityList
      sessionStorage.setItem('communityList', JSON.stringify(communityList))
    },
    SET_ROOMLIST: (state, roomList) => {
      state.roomList = roomList
      sessionStorage.setItem('roomList', JSON.stringify(roomList))
    },
    SET_SELECTCOMMUNITY: (state, selectCommunity) => {
      state.selectCommunity = selectCommunity
      sessionStorage.setItem('selectCommunity', selectCommunity)
    },
    SET_SELECTCOMMUNITYNAME: (state, selectCommunityName) => {
      state.selectCommunityName = selectCommunityName
      sessionStorage.setItem('selectCommunityName', selectCommunityName)
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            /* eslint-disable */
            if(response.status === 200){
              if(response.data.code === 200){
                const data = response.data.data
                commit('SET_TOKEN', response.headers["x-auth-token"]) // 设置vuex里面token的值
                commit('SET_USER_INFO', data)
                setToken(response.headers["x-auth-token"]) // 将token的值存储在cookie或者sessionstorage
                sessionStorage.setItem('x-auth-token', response.headers["x-auth-token"])
              }
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户小区列表
    GetUserCommunity({ commit, state }) {
      return new Promise((resolve, reject) => {
        if(!state.userId ){
          state.userId = sessionStorage.getItem('userId')
        }
        getUserCommunity({id: state.userId})
          .then(response => {
            if(response.status === 200){
              if(response.data.code === 200){
                const communityList = response.data.data
                if (communityList && communityList.length > 0) {
                  // 验证返回的communityList是否是一个非空数组
                  commit('SET_COMMUNITYLIST', communityList) // 设置vuex的用户绑定的小区列表值
                  commit('SET_SELECTCOMMUNITY', communityList[0].id) // 设置vuex的默认选中绑定小区的值
                  commit('SET_SELECTCOMMUNITYNAME', communityList[0].name)
                  getBuildingList({ id: communityList[0].id }).then(response => {
                    if (response.status === 200) {
                      if (response.data.code === 200) {
                        let buildings = response.data.data
                        let roomList = buildings.map(v => {
                          v.label = v.buildingName
                          v.value = v.id
                          v.children = []
                          return v
                        })
                        for (let i = 0; i < roomList.length; i++) {
                          getRoomList({ communityId: communityList[0].id, buildingId: roomList[i].id }).then(response => {
                            if (response.status === 200) {
                              if (response.data.code === 200) {
                                const rooms = response.data.data
                                roomList[i].children = rooms.map(v => {
                                  v.label = v.room
                                  v.value = v.id
                                  return v
                                })
                              }
                            }
                          })
                        }
                        commit('SET_ROOMLIST', roomList)
                      }
                    }
                  })
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
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then((response) => {
            if(response.data.code === 200){
              commit('SET_TOKEN', '')
              removeToken()
              sessionStorage.clear()
              resolve(response)
            }else{
              reject(error)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
