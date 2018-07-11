'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_etudiants', {
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
      nv_etude_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'nv_etudes',
          key: 'id'
        }
      },
      nom: {
        defaultValue: '',
        type: Sequelize.STRING
      },
      prenom: {
        defaultValue: '',
        type: Sequelize.STRING
      },
      date_naissance: {
        defaultValue: null,
        type: Sequelize.DATE
      },
      tel: {
        defaultValue: '',
        type: Sequelize.STRING
      },
      dispo: {
        allowNull: true,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('user_etudiants');
  }
};
