'use strict';
module.exports = (sequelize, DataTypes) => {
  var nv_etude = sequelize.define('nv_etude', {
    nom: DataTypes.STRING
  }, {});
  nv_etude.associate = function(models) {
    // associations can be defined here
    nv_etude.hasMany(models.user_etudiant, {
       foreignKey: 'id',
       onDelete: 'CASCADE'
    });
  };
  return nv_etude;
};
