const baseAttr = {
  min: "%s最小长度为:min",
  max: "%s最大长度为:max",
  length: "%s长度必须为:lentth",
  range: "%s长度为:range",
  pattern: "$s格式错误"
};

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

export function isString(srt) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

const bindMessage = (fn, message) => {
  fn.message = field => message.replace("%s", field || "");
};

export function required(message, opt = {}) {
  return {
    required: true,
    message,
    type: 'string',
    ...opt
  };
}
bindMessage(required, "请输入%s");

//正确的金额
export function num(message) {
  return attrs.pattern(
    /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
    message
  )
}
bindMessage(num, "%s格式不正确");

const attrs = Object.keys(baseAttr).reduce((attrs, key) => {
  attrs[key] = (attr, message = "", opt = {}) => {
    const _attr =
      key === "range" ? { min: attr[0], max: attr[1] } : { [key]: attr };

    return {
      message: message.replace(
        `:${key}`,
        key === "range" ? `${attr[0]}-${attr[1]}` : attr
      ),
      type: "string",
      ..._attr,
      ...opt
    };
  };
  bindMessage(attrs[key], baseAttr[key]);
  return attrs;
}, {});
export default attrs;

//函数防抖-只执行最后一次点击
export const Debounce = (fn, t) => {
  const delay = t || 500
  let timer
  return function () {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}
