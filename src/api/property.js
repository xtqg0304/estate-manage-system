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

