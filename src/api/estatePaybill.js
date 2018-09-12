import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/estatePaybill/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/estatePaybill/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/estatePaybill/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/estatePaybill/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/estatePaybill/update',
    method: 'post',
    data
  })
}
