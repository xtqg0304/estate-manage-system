import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/estatePaydetail/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/estatePaydetail/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/estatePaydetail/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/estatePaydetail/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/estatePaydetail/update',
    method: 'post',
    data
  })
}
