const { Model, DataTypes } = require('sequelize');


class Category extends Model {
 static init(sequelize, DataTypes) {
   super.init({
     id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
     },
     category_name: {
       type: DataTypes.STRING,
       allowNull: false,
     }
   }, {
     sequelize,
     timestamps: false,
     freezeTableName: true,
     underscored: true,
     modelName: 'Category',
   });
 }
}


module.exports = Category;


