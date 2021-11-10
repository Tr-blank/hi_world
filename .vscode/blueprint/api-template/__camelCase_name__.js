import request from '@/utils/request'

export default {
  getUserInfo() {
    return request({
      url: '/users/me',
      method: 'get'
    })
  }
}
