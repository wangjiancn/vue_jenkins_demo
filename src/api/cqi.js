import request from '@/utils/request'

const RELATIVE_URL = '/cqi'

export function getRows(model_name, data) {
  return request({
    method: 'get',
    url: `${RELATIVE_URL}/${model_name}/`,
    data: data,
  })
}
export function getRow(model_name, id, data) {
  return request({
    method: 'get',
    url: `${RELATIVE_URL}/${model_name}/${id}/`,
    data: data,
  })
}

export function createRow(model_name, data) {
  return request({
    method: 'post',
    url: `${RELATIVE_URL}/${model_name}/`,
    data: data,
  })
}

export function updateRow(model_name, id, data) {
  return request({
    method: 'post',
    url: `${RELATIVE_URL}/${model_name}/${id}/`,
    data: data,
  })
}

export function removeRow(model_name, id) {
  return request({
    method: 'delete',
    url: `${RELATIVE_URL}/${model_name}/${id}/`,
  })
}
