// 用户相关接口请求
import http from '@/http'

// 登录接口
export function login(url, data) {
    return http.post(url, data)
}