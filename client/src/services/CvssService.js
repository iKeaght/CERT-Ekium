import http from '../http-common'

export default {
    index({param}) {
        return http().get('cvss', {
            params: param
        })
    },
    post(cvss) {
        return http().post('cvss', cvss)
    },
    show(cvssId) {
        return http().get(`cvss/${cvssId}`)
    },
    put(cvss) {
        return http().put(`cvss/${cvss.id}`, cvss)
    },
    delete (cvss) {
         return http().delete(`cvss/${cvss.id}`, cvss)
    }
}
