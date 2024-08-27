const express = require('express');
const { sequelize } = require('./models');
const { Category, Product } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and use routes
app.use('/api/categories', require('./routes/category-routes'));
app.use('/api/products', require('./routes/product-routes'));
app.use('/api/tags', require('./routes/tag-routes'));

// Sync sequelize models and start server
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    await Category.sync();
    await Product.sync();
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error('Error syncing models with database:', error);
  }
};

syncDatabase();