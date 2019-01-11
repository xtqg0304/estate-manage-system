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

/** 获取滚动图片列表 */
export function fetchScrol(data) {
  return request({
    url: estateServer + '/scrolpic/getScrolPicPage',
    method: 'post',
    data
  })
}
/** 添加/修改滚动图片 */
export function editScrol(data) {
  return request({
    url: estateServer + '/scrolpic/mergeScrolPic',
    method: 'post',
    data
  })
}
/** 添加/修改滚动图片 */
export function deleteScrol(data) {
  return request({
    url: estateServer + '/scrolpic/deleteScrolPic',
    method: 'post',
    data
  })
}
