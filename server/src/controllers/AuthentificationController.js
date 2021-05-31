const { User } = require('../models')
const { Keyword } = require('../models')

const jwt = require('jsonwebtoken')
const config = require('../config/config')

User.hasMany(Keyword, {foreignKey: 'user_email'})
Keyword.belongsTo(User, {foreignKey: 'user_email'})

function jwtSignuser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentification.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}
module.exports = {
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            const userJson = user.toJSON()    
            res.send({
                user: userJson,
                token: jwtSignuser(userJson)
            })
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'This email account is already in use.'

            })
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignuser(userJson)
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    },
    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.useremail)
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the user'
            })
        }
    },
}