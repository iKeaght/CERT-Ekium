const User = require('./User');

module.exports = (sequelize, DataTypes) => {
    const Vulnerability = sequelize.define('Vulnerability',{
        title: {
        type: DataTypes.STRING,  
        allowNull: false 
        }
    })

    Vulnerability.associate = models => {
        Vulnerability.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    
return Vulnerability
}