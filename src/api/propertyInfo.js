import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/propertyInfo/list',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/propertyInfo/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTable(pv) {
  return request({
    url: '/propertyInfo/pv',
    method: 'get',
    params: { pv }
  })
}

export function createNotice(data) {
  return request({
    url: '/propertyInfo/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/propertyInfo/update',
    method: 'post',
    data
  })
}
