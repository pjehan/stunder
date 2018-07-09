'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_entreprise = sequelize.define('user_entreprise', {
    nom: DataTypes.STRING,
    adresse: DataTypes.STRING,
    ville: DataTypes.STRING,
    cp: DataTypes.STRING,
    logo: DataTypes.STRING,
    domaine: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  user_entreprise.associate = function(models) {
    // associations can be defined here
  };
  return user_entreprise;
};
