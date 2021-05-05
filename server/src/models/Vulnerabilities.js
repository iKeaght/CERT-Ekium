const User = require('./User');

module.exports = (sequelize, DataTypes) => {
    const Vulnerability = sequelize.define('Vulnerability',{
        title: {
        type: DataTypes.STRING,  
        allowNull: false 
        },
        user_email: DataTypes.STRING,
        hasbeenseen: DataTypes.BOOLEAN
    })

    Vulnerability.associate = models => {
        Vulnerability.belongsTo(models.User, {
            foreignKey: 'user_email' 
        })
    }
    
return Vulnerability
}