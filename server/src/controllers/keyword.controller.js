/* eslint-disable no-undef */
const { User } = require('../models')
const { Keyword } = require('../models')


User.hasMany(Keyword, {foreignKey: 'user_email'})
Keyword.belongsTo(User, {foreignKey: 'user_email'} )

module.exports = {
    async index(req, res) {
        try {
            const keyword = await Keyword.findAll(
                {distinct: true ,
                where: {
                    user_email: req.query.user_mail
                }})
            res.send(keyword) 
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the vulnerabilities'
            })
        }
    },
    async index_add(req, res) {
        try {
            const keyword = await Keyword.findAll(
                {attributes: ['name'],
                distinct: true ,
                where: {
                    user_email: 'keyword@gmail.com'
                }})
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