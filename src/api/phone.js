import request from '@/utils/request'
import { estateServer } from '@/api/api.js'

/* 获取便民电话信息列表 */
export function fetchList(data) {
  return request({
    url: estateServer + '/telephone/getTelephonePage',
    method: 'post',
    data
  })
}

/* 添加或修改 便民电话 */
export function editTelephone(data) {
  return request({
    url: estateServer + '/telephone/mergeTelephone',
    method: 'post',
    data
  })
}
/* 删除 便民电话 */
export function deleteTelephone(data) {
  return request({
    url: estateServer + '/telephone/deleteTelephone ',
    method: 'post',
    data
  })
}
