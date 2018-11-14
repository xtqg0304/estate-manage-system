import request from '@/utils/request'
import { basicServer } from '@/api/api.js'

export function getToken(data) {
  return request({
    url: basicServer + '/file/uploadImg',
    method: 'post',
    headers: {
      'Content-Type': 'application/multipart/form-data; charset=UTF-8'
    },
    data
  })
}
