import request from '@/utils/request'

const api_name = '/microservice/collection'

export default {
  getPageList(page, limit, userId) {
    return request({
      url: `${api_name}/${page}/${limit}/${userId}`,
      method: 'get'
    })
  }
}
