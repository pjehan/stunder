'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_entreprises', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      nom: {
        defaultValue: '',
        type: Sequelize.STRING
      },
      adresse: {
        defaultValue: '',
        type: Sequelize.STRING
      },
      ville: {
        defaultValue: '',
        type: Sequelize.STRING
      },
      cp: {
        defaultValue: '',
        type: Sequelize.STRING
      },
      logo: {
        defaultValue: '',
        type: Sequelize.STRING
      },
      domaine: {
        defaultValue: '',
        type: Sequelize.STRING
      },
      description: {
        defaultValue: '',
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
