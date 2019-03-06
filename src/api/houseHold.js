import request from '@/utils/request'
import { basicServer } from '@/api/api.js'
/*  下载房产模板 */
export function exportModule(communityId) {
  return request({
    url: basicServer + '/household/exportHouseHoldModule',
    method: 'get',
    params: { communityId }
  })
}
/*  导入房产信息 */
export function importHousehold(data) {
  return request({
    url: basicServer + '/household/importHouseHold',
    method: 'post',
    timeout: 60000,
    headers: {
      'Content-Type': 'application/multipart/form-data; charset=UTF-8'
    },
    data
  })
}
/* 获取房产类型下拉列表 */
// export function fetchEstateTypeList(data) {
//   return request({
//     url: basicServer + '/estate/getEstateTypeList',
//     method: 'post',
//     data
//   })
// }
/* 获取房产table列表 */
export function fetchList(data) {
  return request({
    url: basicServer + '/household/getHouseHoldPage',
    method: 'post',
    data
  })
}
/* 添加/修改房产列表 */
export function editHousehold(data) {
  return request({
    url: basicServer + '/household/mergeHouseHold',
    method: 'post',
    data
  })
}
/* 删除房产列表 */
export function deleteHousehold(data) {
  return request({
    url: basicServer + '/household/deleteHouseHold',
    method: 'post',
    data
  })
}
