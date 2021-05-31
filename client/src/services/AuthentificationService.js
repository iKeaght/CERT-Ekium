import http from '../http-common'

export default {
    register(credentials) {
        return http().post('register', credentials)
    },
    login(credentials) {
        return http().post('login', credentials)
    },
    show(useremail) {
        return http().get(`user/${useremail}`)
    }
}
