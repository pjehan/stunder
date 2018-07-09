'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    mail: DataTypes.STRING,
    mot_de_passe: DataTypes.STRING
    active: DataTypes.TINYINT
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
