import request from '@/utils/request'
import { estateServer, basicServer } from '@/api/api.js'

/* 获取投诉建议信息列表 */
export function fetchList(data) {
  return request({
    url: estateServer + '/complaint/getComplaintElementPage',
    method: 'post',
    data
  })
}

/* 添加或修改 投诉建议 */
export function editComplaint(data) {
  return request({
    url: estateServer + '/complaint/mergeComplaint',
    method: 'post',
    data
  })
}

/* 报事报修推送 */
export function pushComplaint(data) {
  return request({
    url: basicServer + '/wxmsg/sendWxMsgByAppid',
    method: 'post',
    data
  })
}
