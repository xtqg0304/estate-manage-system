import request from '@/utils/request'
import { estateServer } from '@/api/api.js'

/* 获取公告信息列表 */
export function fetchList(data) {
  return request({
    url: estateServer + '/report/getReportElementPage',
    method: 'post',
    data
  })
}

// /* 添加或修改 公告 */
// export function editNotice(data) {
//   return request({
//     url: estateServer + '/notice/mergeNotice',
//     method: 'post',
//     data
//   })
// }
