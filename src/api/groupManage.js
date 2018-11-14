import request from '@/utils/request'
import { basicServer } from '@/api/api.js'
/*  获取集团信息 */
export function fetchGroupInfo(data) {
  return request({
    url: basicServer + '/group/getGroupInfo',
    method: 'post',
    data
  })
}
/*  修改集团信息 */
export function updateGroupInfo(data) {
  return request({
    url: basicServer + '/group/mergeGroup',
    method: 'post',
    data
  })
}
/*  获取省市区 */
export function fetchAreaTree(data) {
  return request({
    url: basicServer + '/area/getAreaTreeByAsync',
    method: 'post',
    data
  })
}
/*  获取省*/
export function fetchProvince(data) {
  return request({
    url: basicServer + '/area/getProvinceList',
    method: 'post',
    data
  })
}
/*  获取区 */
export function fetchCounty(data) {
  return request({
    url: basicServer + '/area/getCountyList',
    method: 'post',
    data
  })
}
/*  获取市*/
export function fetchCity(data) {
  return request({
    url: basicServer + '/area/getCityList',
    method: 'post',
    data
  })
}

