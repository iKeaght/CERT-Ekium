import Api from '@/services/Api'

export default {
    index({vulnerability}) {
        return Api().get('vulnerabilities', {
            params: vulnerability
        })
    },
    post(vulnerability) {
        return Api().post('vulnerabilities', vulnerability)
    },
    show(vulnerabilityId) {
        return Api().get(`vulnerabilities/${vulnerabilityId}`)
    },
    put(vulnerability) {
        return Api().put(`vulnerabilities/${vulnerability.id}`, vulnerability)
    },
    destroy (vulnerabilityId) {
         return Api.destroy(`vulnerabilities/${vulnerabilityId}`)
    }
}
