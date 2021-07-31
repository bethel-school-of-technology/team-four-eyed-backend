'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
  };

  Articles.init({
    articleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trainerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Articles;
};