import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/estatePay/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/estatePay/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/estatePay/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/estatePay/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/estatePay/update',
    method: 'post',
    data
  })
}
