import Api from '@/services/Api'

export default {
    index() {
        return Api().get('vulnerabilities')
    },
    post(vulnerability) {
        return Api().post('vulnerabilities', vulnerability)
    }
}
