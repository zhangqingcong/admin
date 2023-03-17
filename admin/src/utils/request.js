import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import SettingMer from '@/utils/settingMer'
import { isPhone } from '@/libs/wechat';
import { config } from '@vue/test-utils';

const service = axios.create({
  baseURL: SettingMer.apiBaseURL,
  timeout: 60000 
})

service.interceptors.request.use(
  config =>{
    //请求之前先鉴权
    const token = !store.getters.token?sessionStorage.getItem('token'):store.getters.token;
    if(token){
      config.headers['Authori-zation'] = token
    }
    if(/get/i.test(config.method)){
      config.params = config.params || {}
      config.params.temp = Date.parse(new Date()) /1000
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code === 401){
      Message.error('无效的会话，或者登录已过期，请重新登录。');
      location.href = '/login';
    }else if(res.code === 403){
      Message.error('没有权限访问。');
    }
    if(res.code !== 200 && res.code !== 401){
      if(isPhone){
        return Promise.reject(res || 'Error')
      }
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject()
    }else {
      return res.data
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
