import http from '@/http'

// 创建专栏
export function createColumn(data) {
  return http.post('/article/createColumn', data)
}
