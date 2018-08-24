'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('feedbacks', 'createdAt', 'created_at')
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('feedbacks', 'created_at', 'createdAt');
  }
};
