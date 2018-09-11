import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/phone/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/phone/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/phone/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/phone/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/phone/update',
    method: 'post',
    data
  })
}
