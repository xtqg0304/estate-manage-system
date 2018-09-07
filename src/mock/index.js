import Mock from 'mockjs'
import loginAPI from './login'
import noticeAPI from './notice'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 公告相关
Mock.mock(/\/notice\/list/, 'get', noticeAPI.getList)
Mock.mock(/\/notice\/detail/, 'get', noticeAPI.getNotice)
Mock.mock(/\/notice\/pv/, 'get', noticeAPI.getTable)
Mock.mock(/\/notice\/create/, 'post', noticeAPI.createNotice)
Mock.mock(/\/notice\/update/, 'post', noticeAPI.updateNotice)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
