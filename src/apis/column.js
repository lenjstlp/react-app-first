import http from '@/http'

// 创建专栏
export function createColumn(data) {
  return http.post('/column/createColumn', data)
}

// 获取专栏列表
export function getColumnList(data) {
  return http.post('/column/columnList', data)
}

// 根据专栏id查询专栏详情
export function getColumnInfoById(data) {
  return http.post('/column/columnDetails', data)
}
