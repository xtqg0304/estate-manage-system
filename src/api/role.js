import request from '@/utils/request'
import { basicServer } from '@/api/api.js'
/*  获取角色table列表 */
export function fetchRoleList(data) {
  return request({
    url: basicServer + '/role/getRolePage',
    method: 'post',
    data
  })
}
/*  添加修改角色信息 */
export function editRole(data) {
  return request({
    url: basicServer + '/role/mergeRole',
    method: 'post',
    data
  })
}
/*  删除角色信息 */
export function deleteRole(data) {
  return request({
    url: basicServer + '/role/deleteRole',
    method: 'post',
    data
  })
}
/* 获取角色分类列表 */
export function fetchRole(data) {
  return request({
    url: basicServer + '/role/getRoleList',
    method: 'post',
    data
  })
}
/* 获取菜单权限树信息 */
export function fetchAppNavTree(data) {
  return request({
    url: basicServer + '/app/getAppAndNavTree',
    method: 'post',
    data
  })
}
