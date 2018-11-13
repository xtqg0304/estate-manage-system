import request from '@/utils/request'
import { basicServer } from '@/api/api.js'
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
export function fetchAreaList(data) {
  return request({
    url: basicServer + '/region/getRegionTree',
    method: 'post',
    data
  })
}

// export function fetchTable(pv) {
//   return request({
//     url: '/phone/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

