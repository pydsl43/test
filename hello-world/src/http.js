/*
* @Author: fredlee
* @Date:   2017-10-19 11:09:12
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-01-19 14:33:40
*/
import axios from 'axios'
import Vue from 'vue'

const vm = new Vue()

// 请求前的拦截
axios.interceptors.request.use(config => {
  return config
}, error => {
  vm.$Message.error('这是一条错误信息', error)
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  return data
}, error => {
  if (error.response && error.response) {
    let data = error.response.data
    return Promise.reject(data)
  }
})

export default axios
