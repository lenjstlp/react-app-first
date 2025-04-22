import { message } from 'antd'
import axios from 'axios'
import { baseURL } from './config'
import { getToken } from '@/utils'

console.log(import.meta.env.MODE, baseURL, '----------');



const http = axios.create({
    baseURL,
    timeout: 10000
})

http.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

http.interceptors.response.use(response => {
    const { code, message: msg } = response.data
    
    if (code !== 0) {
        message.error(msg)
    }

    return response.data
}, error => {
    return Promise.reject(error)
})

export default http