import Vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'
//解构表达式从setting中取出errorlog的值
//我们可以在setting.js模块中定义两种格式的errorLog
//errorLog: 'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

//判断什么环境需要展示日志
function checkNeed() {
    const env = process.env.NODE_ENV
    if (isString(needErrorLog)) {
        return env === needErrorLog
    }
    if (isArray(needErrorLog)) {
        return needErrorLog.includes(env)
    }
    return false
}

if (checkNeed()) {
    Vue.config.errorHandler = function (err, vm, info) {
        Vue.nextTick(() => {
            store.dispatch('/errorLog/addErrorLog', {
                err,
                vm,
                info,
                url: window.location.href
            })
        })
    }
}


