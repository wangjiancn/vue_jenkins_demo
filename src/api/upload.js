import request from '@/utils/request.js'

export function uploadimage(image) {
  const formdata = new FormData()
  formdata.append('image', image)
  return request({
    method: 'post',
    url: '/upload/image/',
    data: formdata,
    header: { 'Content-Type': 'multipart/form-data' },
  })
}
