import http from '@/axios/index'

export function categories() {
  return http({
    url: 'recomm_travel',
    method: 'GET'
  })
}
export function userPostTravels(page) {
  return http({
    url: `user_travels?page=${page}`,
    method: 'GET'
  })
}
export function userHotCity() {
  return http({
    url: 'hot_city',
    method: 'GET'
  })
}
export function userDetail(id) {
  return http({
    url: '/article_data?article_id=' + id,
    method: 'GET',
  })
}
export function userComment(id, page) {
  return http({
    url: `/comments_data`,
    params: {
      article_id: id,
      page: page,
    },
    method: 'GET',
  })
}
export function userLogin(mobile, password) {
  return http({
    url: 'login',
    method: 'POST',
    data: {
      mobile: mobile,
      password: password
    }
  })
}
export function userVercode(mobile) {
  return http({
    url: '/vercode',
    method: 'GET',
    params: {
      phoneNumbers: mobile
    }
  })
}