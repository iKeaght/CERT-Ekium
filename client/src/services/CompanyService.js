import http from '../http-common'

export default {
post(company) {
    return http().post('company', company)
},
index() {
    return http().get('company')
}
}
