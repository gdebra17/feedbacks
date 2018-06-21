'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    type: DataTypes.STRING,
    token: DataTypes.STRING,
    path_image: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};