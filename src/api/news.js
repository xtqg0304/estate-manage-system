import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/news/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/news/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/news/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/news/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/news/update',
    method: 'post',
    data
  })
}
