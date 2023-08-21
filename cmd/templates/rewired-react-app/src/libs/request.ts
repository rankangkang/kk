import axios from 'axios'

const instance = axios.create({
  validateStatus: status => {
    return status < 500
  }
})

instance.interceptors.response.use(async resp => {
  // 定义响应拦截器
  return resp
})

export interface BaseRes<T = any> {
  stat: string
  data: T
  msg: string
}

export default instance
