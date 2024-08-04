// import models
const Product = require('./product');
const Category = require('./category');
const Tag = require('./tag');
const ProductTag = require('./productTag');

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: 'category_id',
  });

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL',
  });

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: 'product_id',
    otherKey: 'tag_id',
  });
  
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tag_id',
    otherKey: 'product_id',
  });
  
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
  });