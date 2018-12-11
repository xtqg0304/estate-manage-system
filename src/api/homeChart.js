import request from '@/utils/request'
import { paymentServer, wayServer } from '@/api/api.js'

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
    url: wayServer + '/complaint/getComplaintStatus',
    method: 'post',
    data
  })
}
