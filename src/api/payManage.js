import request from '@/utils/request'
import { paymentServer } from '@/api/api.js'
/*  导入账单信息 */
export function importBill(data) {
  return request({
    url: paymentServer + '/property/import/bill',
    method: 'post',
    headers: {
      'Content-Type': 'application/multipart/form-data; charset=UTF-8'
    },
    data
  })
}
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
    data,
    timeout: 100000
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
/* 缴费接口*/
export function cashPay(data) {
  return request({
    url: paymentServer + '/property/case/pay',
    method: 'post',
    data
  })
}

/* 优惠券使用情况 */
export function getDiscountMonthPage(data) {
  return request({
    url: paymentServer + '/property/month/getDiscountMonthPage',
    method: 'post',
    data
  })
}
