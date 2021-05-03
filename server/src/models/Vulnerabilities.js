const User = require('./User');

module.exports = (sequelize, DataTypes) => {
    const Vulnerability = sequelize.define('Vulnerability',{
        title: {
        type: DataTypes.STRING,  
        allowNull: false 
        },
        user_email: DataTypes.STRING
    })

    Vulnerability.associate = models => {
        Vulnerability.belongsTo(models.User, {
            foreignKey: 'user_email' 
        })
    }
    
return Vulnerability
}