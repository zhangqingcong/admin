import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import SettingMer from '@/utils/settingMer'
import { isPhone } from '@/libs/wechat';

//使用自定义配置创建实例
const service = axios.create({
  baseURL: SettingMer.apiBaseURL,
  timeout: 60000 // 过期时间
})

//配置请求拦截器
service.interceptors.request.use(
  config => {
    const token = !store.getters.token ? sessionStorage.getItem('token') : store.getters.token;
    if (token) {
      //请求里面放上token
      config.headers['Authori-zation'] = token
    }

    if (/get/i.test(config.method)) {
      // /get/是创建正则表达式的语法 i是不区分大小写
      config.params = config.params || {} //有请求参数 用请求参数 没有给个空对象
      config.params.temp = Date.parse(new Date()) / 1000
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//配置返回拦截器 在then或者catch之前处理response
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      Message.error('无效的会话，或者登录已过期，请重新登录。');
      location.href = '/login';
    } else if (res.code === 403) {
      Message.error('没有访问权限。');
    }
    if (res.code !== 200 && res.code !== 401) {
      if (isPhone()) {
        return Promise.reject(res || 'Error')
      }
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject()
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
