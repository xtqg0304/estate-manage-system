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
/* 修改或设置角色对应的菜单权限 */
export function setRolePermission(data) {
  return request({
    url: basicServer + '/app/setRolePerm',
    method: 'post',
    data
  })
}
/* 获取角色拥有的应用权限列表 */
export function getRoleAppPermList(data) {
  return request({
    url: basicServer + '/app/getRoleAppPermList',
    method: 'post',
    data
  })
}
/* 获取角色拥有的菜单权限列表 */
export function getRoleNavPermList(data) {
  return request({
    url: basicServer + '/app/getRoleNavPermList',
    method: 'post',
    data
  })
}

/* 获取角色拥有的全部权限列表 */
export function getRoleAllPermList(data) {
  return request({
    url: basicServer + '/app/getRoleAllPermList',
    method: 'post',
    data
  })
}
