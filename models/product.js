const { Model, DataTypes } = require('sequelize');


class Product extends Model {
 static init(sequelize, DataTypes) {
   super.init({
     id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
     },
     product_name: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     price: {
       type: DataTypes.DECIMAL(10, 2),
       allowNull: false,
       validate: {
         isDecimal: true,
       },
     },
     stock: {
       type: DataTypes.INTEGER,
       allowNull: false,
       defaultValue: 10,
       validate: {
         isNumeric: true,
       },
     },
     category_id: {
       type: DataTypes.INTEGER,
       references: {
         model: 'Category',
         key: 'id',
       },
     },
   }, {
     sequelize,
     timestamps: false,
     freezeTableName: true,
     underscored: true,
     modelName: 'Product',
   });
 }
}


module.exports = Product;
