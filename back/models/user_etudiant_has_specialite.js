'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_etudiant_has_specialite = sequelize.define('user_etudiant_has_specialite', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user_etudiant',
        key: 'id'
      }
    },
    specialite_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'specialite',
        key: 'id'
      }
    }
  }, {});
  user_etudiant_has_specialite.associate = function(models) {
    // associations can be defined here
    models.user_etudiant.belongsToMany(models.specialite, {
      through: models.user_etudiant_has_specialite,
      foreignKey: 'user_id',
      otherKey: 'specialite_id',
    });

    models.specialite.belongsToMany(models.user_etudiant, {
      through: models.user_etudiant_has_specialite,
      foreignKey: 'specialite_id',
      otherKey: 'user_id',
    });

    models.user_etudiant_has_specialite.belongsTo(models.user_etudiant, {
      foreignKey: 'user_id',
      as: 'user',
    });

    models.user_etudiant_has_specialite.belongsTo(models.specialite, {
      foreignKey: 'specialite_id',
      as: 'specialite',
    });
  };
  return user_etudiant_has_specialite;
};
