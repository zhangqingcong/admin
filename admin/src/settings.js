//接口请求地址 有配置使用配置的 没有配置使用当前网址路径
const VUE_APP_API_URL = process.env.VUE_APP_BASE_API || `${location.origin}/api/`;
module.exports = {
  apiBaseURL: VUE_APP_API_URL,
  title: "CRMEB",
  
  //是否展示右侧设置面板
  showSettings: true,

  tagView: true,

  fixedHeader: true,

  sidebarLogo: true,

  errorLog: 'production'
}