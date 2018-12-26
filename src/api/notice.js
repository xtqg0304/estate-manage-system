import request from '@/utils/request'
import { estateServer, basicServer } from '@/api/api.js'

/* 获取公告信息列表 */
export function fetchList(data) {
  return request({
    url: estateServer + '/notice/getNoticePage',
    method: 'post',
    data
  })
}

/* 添加或修改 公告 */
export function editNotice(data) {
  return request({
    url: estateServer + '/notice/mergeNotice',
    method: 'post',
    data
  })
}

/* 推送 公告 */
export function pushNotice(data) {
  return request({
    url: basicServer + '/wxmsg/noticeNotify',
    method: 'post',
    data
  })
}
