const cve_urls = require('./cve_urls.model');

module.exports = (sequelize, Sequelize) => {
    const cve_urls = sequelize.define("cve_urls", {
      cve: {
        type: Sequelize.CHAR(20),
        AllowNull: false
      },
      url: {
        type: Sequelize.TEXT
      },
    },
    {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
    }
    );

    return cve_urls;
  };