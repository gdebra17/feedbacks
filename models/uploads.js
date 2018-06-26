'use strict';
module.exports = (sequelize, DataTypes) => {
  var uploads = sequelize.define('uploads', {
    message_id: DataTypes.INTEGER,
    path_upload: DataTypes.STRING
  }, {});
  uploads.associate = function(models) {
    // associations can be defined here
  };
  return uploads;
};
