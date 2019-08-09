import axios from 'axios'
// import router from '../router'

axios.defaults.baseURL = '/oms'
// axios.defaults.timeout = 30000
// axios.defaults.retry = 2 // 超时后，重新请求次数
// axios.defaults.retryDelay = 1000 // 超时后，重新请求间隔时间
axios.defaults.headers.post['Content-Type'] = 'application/json'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.token) config.headers['Authorization'] = localStorage.getItem('token')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Message.error('服务器超时！')
    }
    // const config = error.config
    // 超时处理
    // if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    //   if (!config || !config.retry) return Promise.reject(error)
    //   // 设置变量来跟踪重试次数
    //   config._retryCount = config._retryCount || 0
    //   // 判断是否已经达到最大重新请求次数
    //   if (config._retryCount >= config.retry) {
    //     Message.error('服务器超时！')
    //     return Promise.reject(error)
    //   }
    //   config._retryCount += 1
    //   // eslint-disable-next-line
    //   const backoff = new Promise(reslove => {
    //     setTimeout(() => {
    //       reslove()
    //     }, config.retryDelay || 1)
    //   })
    //   delete config.baseURL
    //   return backoff.then(() => axios(config))
    // }
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 400:
    //       Message({
    //         showClose: true,
    //         message: error.response.data ? error.response.data.message : error.response.data,
    //         type: 'error'
    //       })
    //       break
    //     case 401:
    //       Message({
    //         type: 'error',
    //         message: (error.response && error.response.data && error.response.data.error_description) || '登录失效！请重新登录'
    //       })
    //       router.push('/login')
    //       break
    //     case 404:
    //       Message({
    //         showClose: true,
    //         message: error.response.data ? error.response.data.error : 'Not Found',
    //         type: 'error'
    //       })
    //       break
    //     case 500:
    //       Message({
    //         showClose: true,
    //         message: error.response.data ? error.response.data.message : '服务器错误',
    //         type: 'error'
    //       })
    //       break
    //     default:
    //       break
    //   }
    // }
    return Promise.reject(error && error.response)
  }
)

export default axios
