import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      timestamp: new Date(),
      username: '小张',
      phonenumber: '13655623365',
      roomnumber: '6#1007',
      content: '水管坏了',
      importance: 1,
      'statusevent|1': ['in', 'out'],
      'status|1': ['replyed', 'wait', 'finished']
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
