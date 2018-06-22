'use strict';
module.exports = (sequelize, DataTypes) => {
  var email_histories = sequelize.define('email_histories', {
    email_template_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    information: DataTypes.STRING,
    status: DataTypes.STRING,
    sendingdate: DataTypes.DATE
  }, {});
  email_histories.associate = function(models) {
    // associations can be defined here
  };
  return email_histories;
};