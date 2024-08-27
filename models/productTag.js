const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./Product');
const Tag = require('./Tag');

class ProductTag extends Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Product',
          key: 'id',
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Tag',
          key: 'id',
        },
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'Product_tag',
    });
  }
}

module.exports = ProductTag;