import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      building: '4号楼',
      unit: '3单元',
      floor: '29层',
      roomNumber: '房间号101',
      propertyname: '房产名称（群升白马郡）',
      ownername: '张笑笑',
      ownerphone: '13869532214',
      'statusproperty|1': ['house', 'shops', 'shop', 'other']
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
