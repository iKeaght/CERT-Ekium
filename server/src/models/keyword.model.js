const Keyword = require('./keyword.model');

module.exports = (sequelize, Sequelize) => {
    const Keyword = sequelize.define("keyword", {
      name: {
        type: Sequelize.STRING,
        AllowNull: false
      },
      user_email: {
        type: Sequelize.STRING
      },
    },
    {
    freezeTableName: true
    }
    );

    return Keyword;
  };