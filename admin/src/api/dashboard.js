import request from '@/utils/request'

//首页数据概览
export function viewModelApi() {
  return request({
    url: '/admin/statistics/hoome/index',
    method: 'GET',
  })
}

//用户曲线图
export function charUserApi() {
  return request({
    url: '/admin/statistics/home/chart/user',
    method: 'get'
  })
}

// 用户购买统计
export function chartBuyApi() {
  return request({
    url: '/admin/statistics/home/chart/user/buy',
    method: 'get'
  })
}

// 订单量趋势 30天
export function chartOrder30Api() {
  return request({
    url: '/admin/statistics/home/chart/order',
    method: 'get'
  })
}