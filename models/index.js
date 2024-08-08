
const Sequelize = require('sequelize');
require('dotenv').config();
 
// Construct the connection string from environment variables
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
 
const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
 
// Initialize Sequelize instance
const sequelize = new Sequelize(connectionString, {
dialect: 'postgres', 
logging: false, 
});
 
// Import models
const Product = require('./product');
const Category = require('./category');
const Tag = require('./tag');
const ProductTag = require('./productTag');
 
// Initialize models
Product.init(sequelize, Sequelize.DataTypes);
Category.init(sequelize, Sequelize.DataTypes);
Tag.init(sequelize, Sequelize.DataTypes);
ProductTag.init(sequelize, Sequelize.DataTypes);
 
// Define associations
Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'SET NULL' });
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id', otherKey: 'tag_id' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id', otherKey: 'product_id' });
 
module.exports = {
sequelize, 
Product, 
Category, 
Tag, 
ProductTag, 
};
 
// Sync models with the database
sequelize.sync({ force: true }).then(() => {
console.log('Database & tables created!'); 
}).catch(error => {
console.error('Error synchronizing the database:', error); 
});