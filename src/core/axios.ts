import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import config from './config'
import qs from 'qs'

class HttpRequest {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }
  // 设置请求配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        get: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      },
      transformRequest: [
        // eslint-disable-next-line
        (data: any, config: any) => {
          if (
            config['Content-Type'] &&
            config['Content-Type'].indexOf('multipart/form-data') > -1
          ) {
            return data
          } else if (
            config['Content-Type'] &&
            config['Content-Type'].indexOf('application/json') > -1
          ) {
            return JSON.stringify(data)
          } else {
            return qs.stringify(data, config)
          }
        }
      ]
    }
    return config
  }

  interceptors(instance: AxiosInstance) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => config,
      (error) => Promise.reject(error)
    )
    // 响应拦截
    instance.interceptors.response.use(
      (response: AxiosResponse) => Promise.resolve(response),
      (error) => Promise.reject(error)
    )
  }

  request(config: AxiosRequestConfig) {
    const instance = axios.create()

    config = Object.assign(this.getInsideConfig(), config)
    this.interceptors(instance)
    return instance(config)
  }
}
const request = new HttpRequest(config.baseUrl)

export default request
