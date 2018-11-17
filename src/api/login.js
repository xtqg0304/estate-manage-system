import request from '@/utils/request'
import { basicServer } from '@/api/api.js'
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: basicServer + '/account/login',
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    data
  })
}
export function generateRoutes(appId) {
  const data = {
    appId
  }
  return request({
    url: basicServer + '/user/getUserNavPermTree',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: basicServer + '/account/logout',
    method: 'post'
  })
}

