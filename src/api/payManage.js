import request from '@/utils/request'
import { paymentServer } from '@/api/api.js'
/*  获取物缴账单分页列表 */
export function fetchBillList(data) {
  return request({
    url: paymentServer + '/property/getBillPage',
    method: 'post',
    data
  })
}
/*  修改缴费账单的金额 */
export function editBillAmount(data) {
  return request({
    url: paymentServer + '/property/mergeBill/amount',
    method: 'post',
    data
  })
}
/*  修改缴费账单的状态 */
export function editBillStatus(data) {
  return request({
    url: paymentServer + '/property/mergeBill/status',
    method: 'post',
    data
  })
}
/** 获取物缴订单分页列表 */
export function fetchOrderList(data) {
  return request({
    url: paymentServer + '/property/order/getOrderPage',
    method: 'post',
    data
  })
}
