import request from '@/utils/request'
import { paymentServer } from '@/api/api.js'

/* 获取车场信息列表 */
export function fetchList(data) {
  return request({
    url: paymentServer + '/parkRegister/getParkListByComId',
    method: 'post',
    data
  })
}

/* 新增车场信息列表 */
export function addCarpark(data) {
  return request({
    url: paymentServer + '/parkRegister/insertCarparkInfo',
    method: 'post',
    data
  })
}
/* 修改车场信息列表 */
export function editCarpark(data) {
  return request({
    url: paymentServer + '/parkRegister/updateCarparkInfo',
    method: 'post',
    data
  })
}
/* 删除车场信息列表 */
export function deleteCarpark(data) {
  return request({
    url: paymentServer + '/parkRegister/deleteCarparkInfo',
    method: 'post',
    data
  })
}
/* 获取车场秘钥 */
export function getKey(data) {
  return request({
    url: paymentServer + '/parkRegister/getCarparkSecretKey',
    method: 'post',
    data
  })
}
/* 获取车场详细信息*/
export function getCarparkDetail(data) {
  return request({
    url: paymentServer + '/parkRegister/getParkInfoById',
    method: 'post',
    data
  })
}
/* 车场信息列表 table*/
export function fetchCommunityParkList(data) {
  return request({
    url: paymentServer + '/communityParkInfo/getCommunityParkInfo',
    method: 'post',
    data
  })
}
/* 车道信息列表 table*/
export function fetchLaneList(data) {
  return request({
    url: paymentServer + '/communityParkInfo/getCommunityRoadnfo',
    method: 'post',
    data
  })
}
/* 岗亭信息列表 table*/
export function fetchSentryboxList(data) {
  return request({
    url: paymentServer + '/communityParkInfo/getCommunityPostnfo',
    method: 'post',
    data
  })
}
/* 操作员信息列表 table*/
export function fetchOperatorList(data) {
  return request({
    url: paymentServer + '/communityParkInfo/getCommunityOperatorInfo',
    method: 'post',
    data
  })
}
/* 包月会员信息列表 table*/
export function fetchMonthlyMembersList(data) {
  return request({
    url: paymentServer + '/communityParkInfo/getCommunityMemberWalletInfo',
    method: 'post',
    data
  })
}
/* 包月套餐信息列表 table*/
export function fetchMonthlyPackagesList(data) {
  return request({
    url: paymentServer + '/communityParkInfo/getCommunityMemberInfo',
    method: 'post',
    data
  })
}
