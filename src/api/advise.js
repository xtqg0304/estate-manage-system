import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/advise/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/advise/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/advise/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/advise/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/advise/update',
    method: 'post',
    data
  })
}
