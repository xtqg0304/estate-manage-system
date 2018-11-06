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

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
