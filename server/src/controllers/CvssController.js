const { Cvss, Keyword } = require('../models')

const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {
        try {
            const cvss = await Cvss.findAll(
                {
                attributes: ['cve','severity','description','published_date'],
                group:['cve','severity','description','published_date'],
                order: [[req.query.order, 'DESC']],
                offset: req.query.offset,
                limit: req.query.limit,
                where: { [Op.and]: [
                    {severity: { [Op.iLike]:  '%'+req.query.severity+'%'}},
                    {published_date: { [Op.gt]:  req.query.publication_date}},
                    {[Op.or]: [
                    {description: { [Op.iLike]:  '%'+req.query.keyword+'%'}},
                    {url: { [Op.iLike]:  '%'+req.query.keyword+'%'}}]}
                ]},
            }
                )
            res.send(cvss) 
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the vulnerabilities'
            })
        }
    },
    async count(req, res) {
        try {
            const count = await Cvss.findAll(
                {
                attributes: ['cve'],
                group:['cve'],
                where: { [Op.and]: [
                    {severity: { [Op.iLike]:  '%'+req.query.severity+'%'}},
                    {published_date: { [Op.gt]:  req.query.publication_date}},
                    {[Op.or]: [
                    {description: { [Op.iLike]:  '%'+req.query.keyword+'%'}},
                    {url: { [Op.iLike]:  '%'+req.query.keyword+'%'}}]}
                ]},
            }
                )
            res.send(count) 
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the vulnerabilities'
            })
        }
    }
}