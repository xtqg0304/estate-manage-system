import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/notice/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/notice/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/notice/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/notice/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/notice/update',
    method: 'post',
    data
  })
}
