const Promise = require('bluebird');
const Vulnerabilities = require('./Vulnerabilities');
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
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
    }, {
        hooks: {
            beforeCreate: hashPassword,

        }

    })
    User.associate = models => {
        User.hasMany(models.Vulnerabilities, {
            onDelete: "cascade"
        })
    }



    User.prototype.comparePassword = function comparePassword(password) {
        return bcrypt.compare(password, this.password)
    }
    //User.hasMany(Vulnerabilities)
    //Vulnerabilities.belongsTo(User)
    

    return User
}
