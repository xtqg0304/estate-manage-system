import request from '@/utils/request'
import { estateServer } from '@/api/api.js'

/* 获取投诉建议信息列表 */
export function fetchList(data) {
  return request({
    url: estateServer + '/report/getReportElementPage',
    method: 'post',
    data
  })
}

/* 添加或修改 投诉建议 */
export function editReport(data) {
  return request({
    url: estateServer + '/report/mergeReport',
    method: 'post',
    data
  })
}
