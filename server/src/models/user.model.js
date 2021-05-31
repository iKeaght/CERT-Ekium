const Promise = require('bluebird');
const keyword = require('./keyword.model');
const user = require('./user.model');

const bcrypt = Promise.promisifyAll(require('bcrypt'))


async function hashPassword(user) {
    const SALT_FACTOR = 8

    if (!user.changed('password')) {
        return null;
    }
    const hash = await bcrypt.hash(user.password, SALT_FACTOR)
    user.setDataValue('password', hash);
    return null;

}
module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {
        email: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true

        },
        password: Sequelize.STRING,
        admin: Sequelize.BOOLEAN
    },

    {
        hooks: {
            beforeCreate: hashPassword,
        }

    })


    User.prototype.comparePassword = function comparePassword(password) {
        return bcrypt.compare(password, this.password)
    }
    return User
}
