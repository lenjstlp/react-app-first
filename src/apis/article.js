// 文章模块api
import http from '@/http'

// 发布文章接口
export function publishArticle(data) {
    return http.post('/article/upload', data)
}