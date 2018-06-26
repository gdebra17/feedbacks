'use strict';
module.exports = (sequelize, DataTypes) => {
  var messages = sequelize.define('messages', {
    feedback_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    read: DataTypes.BOOLEAN
  }, {});
  messages.associate = function(models) {
    // associations can be defined here
  };
  return messages;
};