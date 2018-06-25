'use strict';
module.exports = (sequelize, DataTypes) => {
  var = sequelize.define('', {
    email_template_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    information: DataTypes.STRING,
    status: DataTypes.STRING,
    sendingdate: DataTypes.DATE
  }, {
    underscored: true,
  });.associate = function(models) {
    // associations can be defined here
  };
  return;
};