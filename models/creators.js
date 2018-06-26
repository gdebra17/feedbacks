'use strict';
module.exports = (sequelize, DataTypes) => {
  var creators = sequelize.define('creators', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    url_photo: DataTypes.STRING
  }, {});
  creators.associate = function(models) {
    // associations can be defined here
  };
  return creators;
};
