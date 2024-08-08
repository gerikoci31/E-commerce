
const { Model, DataTypes } = require('sequelize');


class Tag extends Model {
 static init(sequelize, DataTypes) {
   super.init({
     id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
     },
     tag_name: {
       type: DataTypes.STRING,
     },
   }, {
     sequelize,
     timestamps: false,
     freezeTableName: true,
     underscored: true,
     modelName: 'Tag',
   });
 }
}


module.exports = Tag;