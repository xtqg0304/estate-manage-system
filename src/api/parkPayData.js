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
/* 获取异常抬闸列表 */
export function fetchAbnormalLiftList(data) {
  return request({
    url: paymentServer + '/dataStatistics/getAbnormalLiftInfo',
    method: 'post',
    data
  })
}
/* 获取车场缴费日报列表 */
export function fetchParkPayReportDailyList(data) {
  return request({
    url: paymentServer + '/dataStatistics/getParkPayReportDaily',
    method: 'post',
    data
  })
}
/* 获取车场缴费月报列表 */
export function fetchParkPayReportMonthList(data) {
  return request({
    url: paymentServer + '/dataStatistics/getParkPayReportMonth',
    method: 'post',
    data
  })
}
/* 获取交接班列表 */
export function fetchShiftChangeList(data) {
  return request({
    url: paymentServer + '/dataStatistics/getShiftChangeInfo',
    method: 'post',
    data
  })
}

/* 获取临停 / 月卡缴费信息 */
export function fetchChargeReportInfo(data) {
  return request({
    url: paymentServer + '/dataStatistics/getChargeReportInfo',
    method: 'post',
    data
  })
}
/* 获取实时缴费记录 */
export function fetchRealTimeChargeReport(data) {
  return request({
    url: paymentServer + '/dataStatistics/getRealTimeChargeReport',
    method: 'post',
    data,
    timeout: 20000
  })
}
