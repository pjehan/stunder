'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_etudiant = sequelize.define('user_etudiant', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    date_naissance: DataTypes.DATE,
    tel: DataTypes.STRING,
    dispo: DataTypes.BOOLEAN
  }, {});
  user_etudiant.associate = function(models) {
    // associations can be defined here
    user_etudiant.belongsTo(models.user, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
    user_etudiant.belongsTo(models.nv_etude, {
      foreignKey: 'nv_etude_id',
      onDelete: 'CASCADE',
      allowNull: true
    });
  };
  return user_etudiant;
};
