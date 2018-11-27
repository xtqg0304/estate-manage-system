import request from '@/utils/request'
import { basicServer } from '@/api/api.js'
/*  获取用户Table列表 */
export function fetchUserList(data) {
  return request({
    url: basicServer + '/user/getUserPage',
    method: 'post',
    data
  })
}
/*  添加/修改用户信息 */
export function editUser(data) {
  return request({
    url: basicServer + '/user/mergeUser',
    method: 'post',
    data
  })
}
/*  删除用户信息 */
export function deleteUser(data) {
  return request({
    url: basicServer + '/user/deleteUser',
    method: 'post',
    data
  })
}
/*  修改 用户密码 */
export function modifyPwd(data) {
  return request({
    url: basicServer + '/user/changeUserPwd',
    method: 'post',
    data
  })
}
/*  用户 绑定 小区 */
export function userBindCommunity(data) {
  return request({
    url: basicServer + '/comm/link/userLink',
    method: 'post',
    data
  })
}
