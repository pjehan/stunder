'use strict';
module.exports = (sequelize, DataTypes) => {
  var specialite = sequelize.define('specialite', {
    nom: DataTypes.STRING
  }, {});
  specialite.associate = function(models) {
    // associations can be defined here
  };
  return specialite;
};