import request from '@/utils/request'

const RELATE_URL = '/cqi'

export function fetchArticles(query) {
  return request({
    url: `${RELATE_URL}/post/`,
    method: 'get',
    params: query,
  })
}

export function fetchArticle(id) {
  return request({
    url: `${RELATE_URL}/post/${id}/`,
    method: 'get',
  })
}

export function delArticle(id) {
  return request({
    url: `${RELATE_URL}/post/${id}/`,
    method: 'delete',
  })
}

export function updateOrCreatePost(post, id = null) {
  return request({
    method: 'post',
    url: `${RELATE_URL}/post/${id ? 'id' + '/' : ''}`,
    data: post,
  })
}

export function fetchTags(query) {
  return request({
    method: 'get',
    url: `${RELATE_URL}/tag/`,
    params: query,
  })
}

export function fetchCategorys(query) {
  return request({
    method: 'get',
    url: `${RELATE_URL}/category/`,
    params: query,
  })
}
