'use strict';
module.exports = (sequelize, DataTypes) => {
  var feedbacks = sequelize.define('feedbacks', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    topic: DataTypes.STRING,
    token: DataTypes.STRING,
    // created_at: DataTypes.DATE,
    // updated_at: DataTypes.DATE,
  }, {underscored: true});
  feedbacks.associate = function(models) {
    // associations can be defined here
  };
  return feedbacks;
};
