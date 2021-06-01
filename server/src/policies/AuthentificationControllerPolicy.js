const Joi = require('joi')

module.exports = {
    register(req, res, next) {
        console.log(req.body)
        const schema = Joi.object({
            email: Joi.string().email(),
            firstname: Joi.string(),
            lastname: Joi.string(),
            admin: Joi.bool(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        })

        const {error} = schema.validate(req.body)
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. It must contain ONLY the following characters: lower case, upper case, numerics.
                        <br>
                        2. It must be at least 8 in length and not greater than 32 characters
                        `
                    })
                    break
                case 'firstname':
                    res.status(400).send({
                        error: `You must provide a valid first name`})
                    break

                case 'lastname':
                    res.status(400).send({
                        error: `You must provide a valid last name`})
                        break
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }

        } else {
            next()
        }
    }
}
