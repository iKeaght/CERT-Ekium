const cvss = require('./cvss.model');


module.exports = (sequelize, Sequelize) => {
    const cvss = sequelize.define("cvss", {
      cve: {
        type: Sequelize.CHAR(20),
        AllowNull: false,
        primarykey: true
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
      url: {
        type: Sequelize.TEXT,
        primarykey: true
      }
      

    },
    {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
    }
    );
    return cvss;
  };