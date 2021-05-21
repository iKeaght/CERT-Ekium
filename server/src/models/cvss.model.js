const cve_urls = require('./cve_urls.model');
const cvss = require('./cvss.model');


module.exports = (sequelize, Sequelize) => {
    const cvss = sequelize.define("cvss", {
      cve: {
        type: Sequelize.CHAR(20),
        primaryKey: true,
        AllowNull: false
      },
      severity: {
        type: Sequelize.CHAR(10)
      },
      description: {
        type: Sequelize.TEXT
      },
      published_date: {
        type: Sequelize.DATEONLY
      },
      last_modified_date: {
        type: Sequelize.DATEONLY
      },
      

    },
    {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
    }
    );
    return cvss;
  };