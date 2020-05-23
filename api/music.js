import request from '@/utils/request'

const api_name = '/microservice/music'
const discuss = '/microservice/discuss-description'
const upload = '/music/oss/file'

export default {
  getPageList(page, limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get'
    })
  },
  getDiscussList(page, limit, id) {
    return request({
      url: `${discuss}/${page}/${limit}/${id}`,
      method: 'get'
    })
  },
  uploadFile(formData) {
    return request({
      url: `${upload}/upload`,
      method: 'post',
      data: formData
    })
  }
}
