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

/** 根据订单号 获取详情列表 */
export function fetchOrderDetail(data) {
  return request({
    url: paymentServer + '/property/detail/getOrderDetailListByOutTradeNo',
    method: 'post',
    data
  })
}

/** 获取物缴订单详情分页列表 */
export function fetchDetailList(data) {
  return request({
    url: paymentServer + '/property/detail/getOrderDetailPage',
    method: 'post',
    data
  })
}
/** 获取物业缴费  月报分页查询列表 */
export function fetchEstatePayMonth(data) {
  return request({
    url: paymentServer + '/property/month/getPayMonthPage',
    method: 'post',
    data
  })
}
/* 获取首页缴费实时数据接口*/
export function fetchPropertyOrderList(data) {
  return request({
    url: paymentServer + '/property/bigData/getPropertyOrderList',
    method: 'post',
    data
  })
}
