
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js'); 

class ProductTag extends Model {}

ProductTag.init({
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Product_tag',
  }
);

module.exports = ProductTag;
