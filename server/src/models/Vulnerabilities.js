module.exports = (sequelize, DataTypes) => {
    const Vulnerability = sequelize.define('Vulnerability',{
        title: DataTypes.STRING,   
    })
return Vulnerability
}