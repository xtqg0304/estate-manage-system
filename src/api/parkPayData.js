import request from '@/utils/request'
import { paymentServer } from '@/api/api.js'

/* 获取在场车辆列表 */
export function fetchCarInParkList(data) {
  return request({
    url: paymentServer + '/dataStatistics/getCarInParkInfo',
    method: 'post',
    data
  })
}

/* 获取车辆进出列表 */
export function fetchInOutParkList(data) {
  return request({
    url: paymentServer + '/dataStatistics/getInOutParkInfo',
    method: 'post',
    data
  })
}
