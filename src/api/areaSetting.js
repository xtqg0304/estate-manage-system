import request from '@/utils/request'
import { basicServer } from '@/api/api.js'
/*  获取区域树 */
export function fetchRegionTree(data) {
  return request({
    url: basicServer + '/region/getRegionTree',
    method: 'post',
    data
  })
}
/*  获取区域列表 */
export function fetchRegionList(data) {
  return request({
    url: basicServer + '/region/getRegionListByPId',
    method: 'post',
    data
  })
}
/*  添加/编辑区域信息 */
export function editRegion(data) {
  return request({
    url: basicServer + '/region/mergeRegion',
    method: 'post',
    data
  })
}
/*  删除区域信息 */
export function deleteRegion(data) {
  return request({
    url: basicServer + '/region/deleteRegion',
    method: 'post',
    data
  })
}
/*  获取区域列表 */
export function fetchRegionOptions(data) {
  return request({
    url: basicServer + '/region/getRegionListByGroupId',
    method: 'post',
    data
  })
}
