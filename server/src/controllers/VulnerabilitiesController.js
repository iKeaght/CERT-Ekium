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
    async show(req, res) {
        try {
            const vulnerability = await Vulnerability.findByPk(req.params.vulnerabilityId)
            res.send(vulnerability)
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
    },
    async put(req, res) {
        try {
            const vulnerability = await Vulnerability.update(req.body, {
                where:{
                    id: req.params.vulnerabilityId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to update the vulnerabilities'
            })
        }
    }

}