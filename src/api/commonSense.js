import request from '@/utils/request'
import { estateServer } from '@/api/api.js'

/* 获取小区资讯 信息列表 */
export function fetchList(data) {
  return request({
    url: estateServer + '/information/getInformationPage',
    method: 'post',
    data
  })
}

/* 添加或修改 小区资讯 */
export function editInformation(data) {
  return request({
    url: estateServer + '/information/mergeInformation',
    method: 'post',
    data
  })
}
