'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Admin.init({
    firstName: DataTypes.STRING,
    allowNull: false,

    lastName: DataTypes.STRING,
    allowNull: false,

    username: DataTypes.STRING,
    allowNull: false,

    email: DataTypes.STRING,
    allowNull: false,

    password: DataTypes.STRING,
    allowNull: false
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};