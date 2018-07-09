'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_admin = sequelize.define('user_admin', {
    nom: DataTypes.STRING
  }, {});
  user_admin.associate = function(models) {
    // associations can be defined here
    user_admin.belongsTo(models.user, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return user_admin;
};
