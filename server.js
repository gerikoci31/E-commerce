const express = require('express');
const { sequelize } = require('./models'); // Import sequelize instance

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and use routes
app.use('/api/categories', require('./routes/category-routes'));
app.use('/api/products', require('./routes/product-routes'));
app.use('/api/tags', require('./routes/tag-routes'));

// Sync sequelize models and start server
sequelize.sync({ force: false }) 
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Error syncing models with database:', err);
  });