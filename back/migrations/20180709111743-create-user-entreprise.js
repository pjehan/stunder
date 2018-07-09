'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_entreprises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      adresse: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ville: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cp: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      domaine: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_entreprises');
  }
};
