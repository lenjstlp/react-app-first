// 用户相关接口请求
import http from '@/http'

// 登录接口
export function login(data) {
  return http.post('/login', data)
}

export function getUserInfoDetail() {
  return http.post('/user/userDetail')
}
