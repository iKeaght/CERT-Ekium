const { Cvss, Keyword } = require('../models')
const {Cve_urls} = require('../models')

Cvss.hasMany(Cve_urls, {foreignKey: 'cve'})
Cve_urls.belongsTo(Cvss, {foreignKey: 'cve'} )

const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {
        try {
            const cvss = await Cvss.findAll(
                {
                    include: [
                    {model: Cve_urls,
                    as: 'cve_urls'}
                ],
                order: [[req.query.order, 'DESC']],
                offset: req.query.offset,
                where: { [Op.and]: [
                    {description: { [Op.iLike]:  '%'+req.query.keyword+'%'}},
                    {published_date: { [Op.gt]:  req.query.publication_date}},
                    {severity: { [Op.iLike]:  '%'+req.query.severity+'%'}},
                    //{cve_urls.url: { [Op.iLike]:  '%'+req.query.keyword+'%'}}
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
}