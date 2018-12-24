import request from '@/utils/request'
import {
  basicServer
} from '@/api/api.js'
/*  获取小区table数据列表 */
export function fetchList(data) {
  return request({
    url: basicServer + '/community/getCommunityPage',
    method: 'post',
    data
  })
}
/*  删除小区数据表格中的数据 */
export function deleteCommunity(data) {
  return request({
    url: basicServer + '/community/deleteCommunity',
    method: 'post',
    data
  })
}
/* 添加小区 */
export function handelAddCommunity(data) {
  return request({
    url: basicServer + '/community/mergeCommunity',
    method: 'post',
    data
  })
}
/*  获取区域（例如：华南，华东）列表 */
// export function fetchAreaList(data) {
//   return request({
//     url: basicServer + '/region/getRegionTree',
//     method: 'post',
//     data
//   })
// }
/*  获取小区列表 */
export function fetchCommunity(data) {
  return request({
    url: basicServer + '/community/getCommunityList',
    method: 'post',
    data
  })
}
/*  获取用户绑定的小区列表 */
export function getUserCommunity(data) {
  return request({
    url: basicServer + '/comm/link/getUserBindCommList',
    method: 'post',
    data
  })
}
/*  获取小区绑定的公众号ID */
export function fetchCommunityBindMpId(data) {
  return request({
    url: basicServer + '/comm/link/getCommunityBindMpId',
    method: 'post',
    data
  })
}
