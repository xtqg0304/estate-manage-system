import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/estatePayrecord/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/estatePayrecord/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/estatePayrecord/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/estatePayrecord/create',
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
