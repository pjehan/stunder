'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_etudiant = sequelize.define('user_etudiant', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    date_naissance: DataTypes.DATE,
    tel: DataTypes.STRING,
    dispo: DataTypes.TINYINT
  }, {});
  user_etudiant.associate = function(models) {
    // associations can be defined here
  };
  return user_etudiant;
};
