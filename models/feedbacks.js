'use strict';
module.exports = (sequelize, DataTypes) => {
  var feedbacks = sequelize.define('feedbacks', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    topic: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  feedbacks.associate = function(models) {
    // associations can be defined here
  };
  return feedbacks;
};