const Company = require('./company.model');

module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
      name: {
        type: Sequelize.STRING,
        AllowNull: false,
        primarykey: true,
      },
      belongsto: {
        type: Sequelize.STRING
      },
    },
    {
    freezeTableName: true,
    }
    );

    return Company;
  };