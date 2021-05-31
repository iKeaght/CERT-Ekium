import http from '../http-common'

export default {
  index({param}) {
    return http().get('keyword', {
        params: param
    })
},
index_add({param}) {
    return http().get('keyword_add', {
        params: param
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
