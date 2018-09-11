import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      timestamp: new Date(),
      author: '1111',
      reviewer: '11111',
      title: '公告公告',
      content: '公告公告内容内容',
      importance: 1,
      'status|1': ['published', 'draft', 'deleted'],
      pageviews: 111111
    })
  )
}

export default {
  getList: config => {
    const { page = 1, limit = 20, sort } = param2Obj(config.url)
    let mockList = List.filter(item => {
      return true
    })
    if (sort === '-id') {
      mockList = mockList.reverse()
    }
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    )
    return {
      total: mockList.length,
      items: pageList
    }
  },
  getTable: () => ({
    pvData: [
      { key: 'PC', pv: 1024 },
      { key: 'mobile', pv: 1024 },
      { key: 'ios', pv: 1024 },
      { key: 'android', pv: 1024 }
    ]
  }),
  getNotice: config => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  createNotice: () => ({
    data: 'success'
  }),
  updateNotice: () => ({
    data: 'success'
  })
}
