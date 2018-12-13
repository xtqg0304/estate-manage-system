import request from '@/utils/request'
import { basicServer } from '@/api/api.js'
/*  获取公众号列表 */
export function fetchList(data) {
  return request({
    url: basicServer + '/mp/config/getWechatMPInfoPage',
    method: 'post',
    data
  })
}
/*  添加/修改公众号 */
export function editPublicAccount(data) {
  return request({
    url: basicServer + '/mp/config/mergeWechatMPInfo',
    method: 'post',
    data
  })
}
/*  删除公众号 */
export function deletePublicAccount(data) {
  return request({
    url: basicServer + '/mp/config/deleteWechatMPInfo',
    method: 'post',
    data
  })
}

/*  获取小程序列表 */
export function fetchsmallList(data) {
  return request({
    url: basicServer + '/ma/config/getMaInfoPage',
    method: 'post',
    data
  })
}
/*  添加/修改小程序列表 */
export function editSmallProject(data) {
  return request({
    url: basicServer + '/ma/config/mergeMaInfo',
    method: 'post',
    data
  })
}
/*  添加/修改小程序列表 */
export function deleteSmallProject(data) {
  return request({
    url: basicServer + '/ma/config/deleteMaInfo',
    method: 'post',
    data
  })
}
/*  小程序 绑定 公众号 */
export function bindPublicAccount(data) {
  return request({
    url: basicServer + '/ma/config/setMaBindMp',
    method: 'post',
    data
  })
}
/*  公众号 绑定 小区 */
export function bindCommunity(data) {
  return request({
    url: basicServer + '/comm/link/communityLinkWechat',
    method: 'post',
    data
  })
}
/*  获取公众号列表 */
export function fetchWechatList(data) {
  return request({
    url: basicServer + '/mp/config/getWechatMPInfoList',
    method: 'post',
    data
  })
}
/*  获取小程序绑定的公众号id */
export function fetcMaBingMpId(data) {
  return request({
    url: basicServer + '/ma/config/getMaBingMpId',
    method: 'post',
    data
  })
}
