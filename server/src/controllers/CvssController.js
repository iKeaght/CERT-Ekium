const { Cvss } = require('../models')
const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {
        try {
            const cvss = await Cvss.findAll({
                distinct: true,
                order: [['published_date', 'DESC']],
                where: {description: { [Op.iLike]: '%windows%'}}
                })
            res.send(cvss) 
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the vulnerabilities'
            })
        }
    },
}