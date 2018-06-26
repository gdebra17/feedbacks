'use strict';
module.exports = (sequelize, DataTypes) => {
  var email_histories = sequelize.define('email_histories', {
    email_template_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    information: DataTypes.STRING,
    status: DataTypes.STRING,
    sendingdate: DataTypes.DATE
  }, {
    underscored: true,
  });
  email_histories.associate = function(models) {
    email_histories.belongsTo(models.email_templates);
    email_histories.belongsTo(models.users);
  };
  return email_histories;
};
