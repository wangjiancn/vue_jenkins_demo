import Axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const axiosInstance = Axios.create({
  baseURL: '/api/',
  timeout: 60 * 1000,
})

axiosInstance.interceptors.request.use(
  function(config) {
    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.cn_msg || res.msg,
        type: 'error',
        duration: 3 * 1000,
      })
      return Promise.reject(res.data)
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message || 'error',
      type: 'error',
      duration: 5 * 1000,
    })
  }
)

export default axiosInstance
