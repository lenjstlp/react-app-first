// 文章模块api
import http from '@/http'

// 发布文章接口
export function publishArticle(data) {
    return http.post('/article/upload', data)
}

// 文章列表
export function getList() {
    return http.get('/article/getArticleList')
}

// 删除文章
export function deleteArticle(data) {
    return http.post('/article/deleteById', data)
}