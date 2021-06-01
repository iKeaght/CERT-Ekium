const { Company } = require('../models')

const { Op } = require("sequelize");


module.exports = {

    async post(req, res) {
        try {
            const company = await Company.create(req.body)
            res.send(company)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create the vulnerabilities'
            })
        }
    },
    async index(req, res) {
        try {
            console.log('test')
            const company = await Company.findAll({attributes: ['name']})
            res.send(company)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the companies'
            })
        }
    },
}