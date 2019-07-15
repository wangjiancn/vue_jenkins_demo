import request from '@/utils/request'

export function fetchArticles(query) {
  return request({
    url: '/article/',
    method: 'get',
    params: query,
  })
}

export function fetchArticle(id) {
  return request({
    url: `/article/${id}/`,
    method: 'get',
  })
}

export function delArticle(id) {
  return request({
    url: `/article/${id}/`,
    method: 'delete',
  })
}

export function updateOrCreatePost(post, id = null) {
  return request({
    method: 'post',
    url: `/article/${id ? id + '/' : ''}`,
    data: post,
  })
}

export function fetchTags(query = {}) {
  query.limit = 999
  return request({
    method: 'get',
    url: '/tag/',
    params: query,
  })
}

export function fetchCategorys(query) {
  return request({
    method: 'get',
    url: '/cat/',
    params: query,
  })
}
