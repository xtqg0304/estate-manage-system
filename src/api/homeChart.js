import request from '@/utils/request'
import { paymentServer, wayServer, estateServer } from '@/api/api.js'

/*  获取支付类型分析数据 */
export function fetchPayTypeAnalysis(data) {
  return request({
    url: paymentServer + '/property/bigData/getPayTypeAnalysis',
    method: 'post',
    data
  })
}
/*  获取物缴分析的数据 */
export function fetchPropertyPayAnalysis(data) {
  return request({
    url: paymentServer + '/property/bigData/getPropertyPayAnalysis',
    method: 'post',
    data
  })
}
/*  获取物缴趋势数据 */
export function fetchPropertyPayTrend(data) {
  return request({
    url: paymentServer + '/property/bigData/getPropertyPayTrend',
    method: 'post',
    data
  })
}
/*  获取门禁设备分析数据 */
export function fetchDevicetypeCount(data) {
  return request({
    url: wayServer + '/static/getDevicetypeCount',
    method: 'post',
    data
  })
}

/*  获取报事报修分析数据 */
export function fetchComplaintStatus(data) {
  return request({
    url: estateServer + '/complaint/getComplaintStatus',
    method: 'post',
    data
  })
}

/*  获取获取门禁实时数据列表 */
export function fetchDeviceInoutPage(data) {
  return request({
    url: wayServer + '/inout/getDeviceInoutPage',
    method: 'post',
    data
  })
}
/*  获取进出车辆数据统计 */
export function fetchInOutCountInfo(data) {
  return request({
    url: paymentServer + '/parkBigData/getInOutCountInfo',
    method: 'post',
    data
  })
}
/*  获取停车缴费统计 */
export function fetchParkingChargeInfo(data) {
  return request({
    url: paymentServer + '/parkBigData/getParkingChargeInfo',
    method: 'post',
    data
  })
}
/*  获取停车实时数据 */
export function fetchParkingRealTimeInfo(data) {
  return request({
    url: paymentServer + '/parkBigData/getParkingRealTimeInfo',
    method: 'post',
    data
  })
}
/*  获取报事报修趋势图数据 */
export function fetchComplaintStatusTrend(data) {
  return request({
    url: estateServer + '/complaint/getComplaintStatusTrend',
    method: 'post',
    data
  })
}
/*  获取进出记录趋势图数据 */
export function fetchtDcInoutFlagType(data) {
  return request({
    url: wayServer + '/inout/getDcInoutFlagType',
    method: 'post',
    data
  })
}
