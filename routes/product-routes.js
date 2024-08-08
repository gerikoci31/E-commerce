const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../models');
 
// The /api/products endpoint
 
// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// POST create a new product
router.post('/', async (req, res) => {
  try {
    // Destructure the request body
    const { product_name, price, stock, tagIds } = req.body;
     // Create the new product
    const product = await Product.create({
      product_name,
      price,
      stock
    });
     // If there are tags to associate
    if (tagIds && tagIds.length) {
      // Create the array of product-tag pairings
      const productTagIdArr = tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
     
      // Bulk create the associations in the ProductTag model
      await ProductTag.bulkCreate(productTagIdArr);
    }
     // Respond with the created product
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});
 
// update product
router.put('/:id', (req, res) => {
// update product data 
Product.update(req.body, { 
  where: {
    id: req.params.id,
  },
})
  .then((product) => {
    if (req.body.tagIds && req.body.tagIds.length) {
     
      ProductTag.findAll({
        where: { product_id: req.params.id }
      }).then((productTags) => {
        // create filtered list of new tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
 
          // figure out which ones to remove
        const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
                // run both actions
        return Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
        ]);
      });
    }
 
    return res.json(product);
  })
  .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
  });
});
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete the product
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
     // Check if a product was actually deleted
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
   
    res.status(204).end(); // No content to send back for successful deletion
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
 module.exports = router;