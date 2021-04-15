import Api from '@/services/Api'

export default {
    index() {
        return Api().get('vulnerabilities')
    },
    post(vulnerability) {
        return Api().post('vulnerabilities', vulnerability)
    },
    show(vulnerabilityId){
        return Api().get(`vulnerabilities/${vulnerabilityId}`)
    },
    put(vulnerability) {
        return Api().put(`vulnerabilities/${vulnerability.id}`, vulnerability)
    },
}
