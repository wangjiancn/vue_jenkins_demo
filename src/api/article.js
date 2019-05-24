import request from '@/utils/request'

export function fetchArticles(query) {
  return request({
    url: '/article',
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

export function updateOrCreatePost(post, id = null) {
  const url = id ? `/article/${id}/` : '/article/'
  return request({
    method: 'post',
    url: url,
    data: post,
  })
}

export function fetchTags(query) {
  return request({
    method: 'get',
    url: '/tag',
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
