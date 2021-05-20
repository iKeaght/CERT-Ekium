import http from '../http-common'

export default {
  index({keyword}) {
    return http().get('keyword', {
        params: keyword
    })
},
post(keyword) {
    return http().post('keyword', keyword)
},
show(keywordId) {
    return http().get(`keyword/${keywordId}`)
},
put(keyword) {
    return http().put(`keyword/${keyword.id}`, keyword)
},
delete (keyword) {
     return http().delete(`keyword/${keyword.id}`, keyword)
}
}
