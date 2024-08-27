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
logging: console.log,
});

 
// Import models
const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
 
// Initialize models
Category.init(sequelize, Sequelize.DataTypes);
Product.init(sequelize, Sequelize.DataTypes);

Tag.init(sequelize, Sequelize.DataTypes);
ProductTag.init(sequelize, Sequelize.DataTypes);
 
// Define associations
Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'SET NULL' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id', otherKey: 'tag_id' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id', otherKey: 'product_id' });
 
module.exports = {
sequelize, 
Category, 
Product, 
Tag, 
ProductTag, 
};
 
async function syncDatabase() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      
      // Synchronize models in the correct order
      await Category.sync({ force: true });
      await Product.sync({ force: true });
      await Tag.sync({ force: true });
      await ProductTag.sync({ force: true });

      console.log('Database & tables created!');
    } catch (error) {
      console.error('Error synchronizing the database:', error);
    }
  }
  
syncDatabase();