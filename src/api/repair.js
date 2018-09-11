import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/repair/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/repair/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/repair/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/repair/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/repair/update',
    method: 'post',
    data
  })
}
