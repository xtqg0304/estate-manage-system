import request from '@/utils/request'
import { estateServer } from '@/api/api.js'

export function fetchList(data) {
  return request({
    url: estateServer + '/notice/getNoticePage',
    method: 'post',
    data
  })
}
