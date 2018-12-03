import request from '@/utils/request'
import { basicServer } from '@/api/api.js'
/*  下载房产模板 */
export function exportModule(communityId) {
  return request({
    url: basicServer + '/estate/exportEstateModule',
    method: 'get',
    params: { communityId }
  })
}
/*  导入房产信息 */
export function importEstate(data) {
  return request({
    url: basicServer + '/estate/importEstate',
    method: 'post',
    headers: {
      'Content-Type': 'application/multipart/form-data; charset=UTF-8'
    },
    data
  })
}
/* 获取房产类型下拉列表 */
export function fetchEstateTypeList(data) {
  return request({
    url: basicServer + '/estate/getEstateTypeList',
    method: 'post',
    data
  })
}
/* 获取房产table列表 */
export function fetchList(data) {
  return request({
    url: basicServer + '/estate/getEstatePage',
    method: 'post',
    data
  })
}
/* 添加/修改房产列表 */
export function editEstate(data) {
  return request({
    url: basicServer + '/estate/mergeEstate',
    method: 'post',
    data
  })
}
/* 删除房产列表 */
export function deleteEstate(data) {
  return request({
    url: basicServer + '/estate/deleteEstateById',
    method: 'post',
    data
  })
}
/* 获取房产楼栋 */
export function getBuildingList(data) {
  return request({
    url: basicServer + '/estate/getBuildingList',
    method: 'post',
    data
  })
}
/* 获取房产房间号 */
export function getRoomList(data) {
  return request({
    url: basicServer + '/estate/getEstateList',
    method: 'post',
    data
  })
}
