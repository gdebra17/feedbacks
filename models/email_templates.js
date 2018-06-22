'use strict';
module.exports = (sequelize, DataTypes) => {
  var email_templates = sequelize.define('email_templates', {
    code: DataTypes.STRING,
    subject: DataTypes.STRING,
    body: DataTypes.STRING
  }, {});
  email_templates.associate = function(models) {
    // associations can be defined here
  };
  return email_templates;
};