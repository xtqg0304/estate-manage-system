import request from '@/utils/request'
import { basicServer } from '@/api/api.js'
/*  获取app应用树 */
export function fetchAppTree(data) {
  return request({
    url: basicServer + '/app/getAppTree',
    method: 'post',
    data
  })
}
/*  获取app应用表格列表 */
export function fetchAppList(data) {
  return request({
    url: basicServer + '/app/getAppPageByParentId',
    method: 'post',
    data
  })
}
/*  添加/编辑应用管理信息 */
export function editApp(data) {
  return request({
    url: basicServer + '/app/mergeApp',
    method: 'post',
    data
  })
}
/*  获取导航树 */
export function fetchNavTree(data) {
  return request({
    url: basicServer + '/app/getAppAndNavTree',
    method: 'post',
    data
  })
}
/*  获取导航table列表*/
export function fetchNavList(data) {
  return request({
    url: basicServer + '/nav/getNavPageByAppIdAndPId',
    method: 'post',
    data
  })
}
/*  添加和修改 导航table列表*/
export function editNav(data) {
  return request({
    url: basicServer + '/nav/mergeNav',
    method: 'post',
    data
  })
}
/*  添加和修改 导航table列表*/
export function deleteNav(data) {
  return request({
    url: basicServer + '/nav/deleteNavByIdAndAppId',
    method: 'post',
    data
  })
}
