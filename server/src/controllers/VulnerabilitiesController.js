const { Vulnerability } = require('../models')
module.exports = {
    async index(req, res) {
        try {
            const vulnerabilities = await Vulnerability.findAll({
                limit: 10
            })
            res.send(vulnerabilities)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the vulnerabilities'
            })
        }
    },
    async post(req, res) {
        try {
            const vulnerability = await Vulnerability.create(req.body)
            res.send(vulnerability)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create the vulnerabilities'
            })
        }
    }

}