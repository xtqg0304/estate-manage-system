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
