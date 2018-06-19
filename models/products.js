'use strict';
module.exports = (sequelize, DataTypes) => {
  var products = sequelize.define('products', {
    name: DataTypes.STRING,
    decathlonid: DataTypes.STRING,
    url: DataTypes.STRING,
    expiringdate: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };
  return products;
};