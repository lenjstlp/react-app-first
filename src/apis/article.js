// 文章模块api
import http from '@/http'

// 发布文章接口
export function publishArticle(data) {
  return http.post('/article/upload', data)
}

// 文章列表
export function getList(data) {
  return http.post('/article/pageList', data)
}

// 删除文章
export function deleteArticle(data) {
  return http.post('/article/deleteById', data)
}

// 研究院**************************
export function addAndEditArticle(data, id) {
  let url = ''
  if (id) {
    url = '/article/editArticle'
  } else {
    url = '/article/addArticle'
  }
  return http.post(url, data)
}

// 文章列表
export function pageList(data) {
  return http.post('/article/pageList', data)
}

// 文章列表
export function userPageList(data) {
  return http.post('/article/userPageList', data)
}

// 文章详情
export function getArticleById(data) {
  return http.post('/article/getArticleById', data)
}

// 换一批推荐文章
export function getRecommendArticles(data) {
  return http.post('/article/recommendArticles', data)
}
