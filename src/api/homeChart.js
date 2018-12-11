import request from '@/utils/request'
import { paymentServer } from '@/api/api.js'

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
