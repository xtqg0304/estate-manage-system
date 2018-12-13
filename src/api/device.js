import request from '@/utils/request'
import { basicServer, wayServer } from '@/api/api.js'

/* 获取选中小区下楼栋列表或者通过小区ID和楼栋ID获取单元 */
export function getCommunity(data) {
  return request({
    url: basicServer + '/estate/getEstateList',
    method: 'post',
    data
  })
}
/* 获取选中小区下楼栋 */
export function getBuilding(data) {
  return request({
    url: basicServer + '/estate/getBuildingList',
    method: 'post',
    data
  })
}
/* 获取设备类型 */
export function getDevieType(data) {
  return request({
    url: wayServer + '/device/getDeviceType',
    method: 'post',
    data
  })
}

/* 添加设备类型 */
export function crateDeive(data) {
  return request({
    url: wayServer + '/device/mergeDevice',
    method: 'post',
    data
  })
}

/* 分页查询获取设备 */
export function getDeviceList(data) {
  return request({
    url: wayServer + '/device/getDevicePage',
    method: 'post',
    data
  })
}

/* 删除设备 */
export function deleteDvice(data) {
  return request({
    url: wayServer + '/device/deleteDevice',
    method: 'post',
    data
  })
}
/* 修改设备 */
export function updateDvice(data) {
  return request({
    url: wayServer + '/device/mergeDevice',
    method: 'post',
    data
  })
}

/* 绑定获取钥匙*/
export function getCode(data) {
  return request({
    url: wayServer + '/qrcode/getQrcodeUser',
    method: 'post',
    data
  })
}

/* 获取开门日志*/
export function getOpenLog(data) {
  return request({
    url: wayServer + '/inout/getDeviceInoutPage',
    method: 'post',
    data
  })
}

/* 获取微信钥匙*/
export function getkeyPage(data) {
  return request({
    url: wayServer + '/qrcode/getQrcodeUserKeys',
    method: 'post',
    data
  })
}

/* 更改钥匙可用状态*/
export function updatekeyPage(data) {
  return request({
    url: wayServer + '/qrcode/mergeQrcodeUser',
    method: 'post',
    data
  })
}
