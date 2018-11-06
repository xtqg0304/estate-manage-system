import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/householdInfo/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/householdInfo/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/householdInfo/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/householdInfo/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/householdInfo/update',
    method: 'post',
    data
  })
}
