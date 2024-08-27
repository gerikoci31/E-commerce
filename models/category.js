const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories',
    });
  }
}

module.exports = Category;