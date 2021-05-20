const { Keyword } = require('../models')
module.exports = {
    async index(req, res) {
        try {
            const keyword = await Keyword.findAll({distinct: true })
            res.send(keyword) 
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the vulnerabilities'
            })
        }
    },
    async show(req, res) {
        try {
            const keyword = await Keyword.findByPk(req.params.keywordId)
            res.send(keyword)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the vulnerabilities'
            })
        }
    },
    async post(req, res) {
        try {
            const keyword = await Keyword.create(req.body)
            res.send(keyword)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create the vulnerabilities'
            })
        }
    },
    async put(req, res) {
        try {
            const keyword = await Keyword.update(req.body, {
                where:{
                    id: req.params.keywordId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to update the vulnerabilities'
            })
        }
    },
    async delete(req, res) {
        try {
            const keyword = await Keyword.destroy({
                where:{
                    id: req.params.keywordId
                }
            })
            res.send(req.body)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has occured trying to destroy the keyword'
            })
        }
    }

}