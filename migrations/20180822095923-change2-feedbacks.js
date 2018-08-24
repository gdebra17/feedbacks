'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('feedbacks', 'updatedAt', 'updated_at')
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('feedbacks', 'updated_at', 'updatedAt');
  }
};
