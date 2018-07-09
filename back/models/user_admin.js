'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_admin = sequelize.define('user_admin', {
    nom: DataTypes.STRING
  }, {});
  user_admin.associate = function(models) {
    // associations can be defined here
  };
  return user_admin;
};