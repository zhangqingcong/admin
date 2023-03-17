import req from './req'

/**
 * 查询授权
 * @param pram
 */
 export function authCertQuery(prams) {
    const data = {
        domain_name:prams.host,
        label:22,
        version:'2.0'
    }
    return req({
      url: document.location.protocol + '//authorize.crmeb.net/api/auth_cert_query',
      // url: 'https://authorize.crmeb.net/api/auth_cert_query',
      method: 'POST',
      data
    })
}

/**
 * 授权表单提交
 */
 export function authCertSubmit(data) {
    return req({
      url: document.location.protocol + '//authorize.crmeb.net/api/auth_apply',
      // url: 'https://authorize.crmeb.net/api/auth_apply',
      method: 'POST',
      data
    })
}