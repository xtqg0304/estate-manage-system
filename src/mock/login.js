import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '用户名 Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '用户名 Editor'
  },
  estate: {
    roles: ['estate'],
    token: 'estate',
    introduction: '我是estate',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '用户名 estate'
  },
  pay: {
    roles: ['pay'],
    token: 'pay',
    introduction: '我是pay',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '用户名 pay'
  },
  door: {
    roles: ['door'],
    token: 'door',
    introduction: '我是door',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '用户名 door'
  },
  vehicle: {
    roles: ['vehicle'],
    token: 'vehicle',
    introduction: '我是vehicle',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '用户名 vehicle'
  },
  statisticalReport: {
    roles: ['statisticalReport'],
    token: 'statisticalReport',
    introduction: '我是statisticalReport',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '用户名 statisticalReport'
  },
  groupSetting: {
    roles: ['groupSetting'],
    token: 'groupSetting',
    introduction: '我是groupSetting',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '用户名 groupSetting'
  },
  communitySetting: {
    roles: ['communitySetting'],
    token: 'communitySetting',
    introduction: '我是communitySetting',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '用户名 communitySetting'
  }
}

export default {
  loginByUsername: config => {
    // console.log(JSON.parse(config.body))
    const { username } = JSON.parse(config.body) // 后台获取用户传过来的用户名
    return userMap[username]
  },
  getUserInfo: config => {
    // console.log(param2Obj(config.url))
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
