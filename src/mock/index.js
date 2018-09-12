import Mock from 'mockjs'
import loginAPI from './login'
import noticeAPI from './notice'
import newsAPI from './news'
import repairAPI from './repair'
import adviseAPI from './advise'
import phoneAPI from './phone'
import estatePaybillAPI from './estatePaybill'
import estatePayrecordAPI from './estatePayrecord'
import estatePaydetailAPI from './estatePaydetail'
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
// 资讯相关
Mock.mock(/\/news\/list/, 'get', newsAPI.getList)
Mock.mock(/\/news\/detail/, 'get', newsAPI.getNotice)
Mock.mock(/\/news\/pv/, 'get', newsAPI.getTable)
Mock.mock(/\/news\/create/, 'post', newsAPI.createNotice)
Mock.mock(/\/news\/update/, 'post', newsAPI.updateNotice)
// 报事报修相关
Mock.mock(/\/repair\/list/, 'get', repairAPI.getList)
Mock.mock(/\/repair\/detail/, 'get', repairAPI.getNotice)
Mock.mock(/\/repair\/pv/, 'get', repairAPI.getTable)
Mock.mock(/\/repair\/create/, 'post', repairAPI.createNotice)
Mock.mock(/\/repair\/update/, 'post', repairAPI.updateNotice)
// 投诉建议相关
Mock.mock(/\/advise\/list/, 'get', adviseAPI.getList)
Mock.mock(/\/advise\/detail/, 'get', adviseAPI.getNotice)
Mock.mock(/\/advise\/pv/, 'get', adviseAPI.getTable)
Mock.mock(/\/advise\/create/, 'post', adviseAPI.createNotice)
Mock.mock(/\/advise\/update/, 'post', adviseAPI.updateNotice)
// 便民电话相关
Mock.mock(/\/phone\/list/, 'get', phoneAPI.getList)
Mock.mock(/\/phone\/detail/, 'get', phoneAPI.getNotice)
Mock.mock(/\/phone\/pv/, 'get', phoneAPI.getTable)
Mock.mock(/\/phone\/create/, 'post', phoneAPI.createNotice)
Mock.mock(/\/phone\/update/, 'post', phoneAPI.updateNotice)

// 物业缴费相关
Mock.mock(/\/estatePaybill\/list/, 'get', estatePaybillAPI.getList)
Mock.mock(/\/estatePaybill\/detail/, 'get', estatePaybillAPI.getNotice)
Mock.mock(/\/estatePaybill\/pv/, 'get', estatePaybillAPI.getTable)
Mock.mock(/\/estatePaybill\/create/, 'post', estatePaybillAPI.createNotice)
Mock.mock(/\/estatePaybill\/update/, 'post', estatePaybillAPI.updateNotice)

// 物业缴费记录相关
Mock.mock(/\/estatePayrecord\/list/, 'get', estatePayrecordAPI.getList)
Mock.mock(/\/estatePayrecord\/detail/, 'get', estatePayrecordAPI.getNotice)
Mock.mock(/\/estatePayrecord\/pv/, 'get', estatePayrecordAPI.getTable)
Mock.mock(/\/estatePayrecord\/create/, 'post', estatePayrecordAPI.createNotice)
Mock.mock(/\/estatePayrecord\/update/, 'post', estatePayrecordAPI.updateNotice)

// 物业缴费明细相关
Mock.mock(/\/estatePaydetail\/list/, 'get', estatePaydetailAPI.getList)
Mock.mock(/\/estatePaydetail\/detail/, 'get', estatePaydetailAPI.getNotice)
Mock.mock(/\/estatePaydetail\/pv/, 'get', estatePaydetailAPI.getTable)
Mock.mock(/\/estatePaydetail\/create/, 'post', estatePaydetailAPI.createNotice)
Mock.mock(/\/estatePaydetail\/update/, 'post', estatePaydetailAPI.updateNotice)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
