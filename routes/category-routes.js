const router = require('express').Router();
const { Category, Product } = require('../models');
 
// GET all categories with associated products
router.get('/', async (req, res) => {
try { 
  const categories = await Category.findAll({
    include: {
      model: Product,
      as: 'Products'
    }
  });
  res.status(200).json(categories);
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});
 
// GET a single category by id with associated products
router.get('/:id', async (req, res) => {
try { 
  const category = await Category.findByPk(req.params.id, {
    include: {
      model: Product,
      as: 'products'
    }
  });
 
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
 
  res.status(200).json(category);
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});
 
// POST create a new category
router.post('/', async (req, res) => {
try { 
  const { category_name } = req.body;
 
  if (!category_name) {
    return res.status(400).json({ message: 'Category name is required' });
  }
 
  const newCategory = await Category.create({ category_name });
  res.status(201).json(newCategory);
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});
 
// PUT update a category by id
router.put('/:id', async (req, res) => {
try { 
  const { id } = req.params;
  const { category_name } = req.body;
 
  if (!category_name) {
    return res.status(400).json({ message: 'Category name is required' });
  }
 
  const [updated] = await Category.update({ category_name }, {
    where: { id },
    returning: true
  });
 
  if (updated === 0) {
    return res.status(404).json({ message: 'Category not found' });
  }
 
  const updatedCategory = await Category.findByPk(id);
  res.status(200).json(updatedCategory);
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});
 
// DELETE a category by id
router.delete('/:id', async (req, res) => {
try { 
  const { id } = req.params;
 
  const deletedCount = await Category.destroy({
    where: { id }
  });
 
  if (deletedCount === 0) {
    return res.status(404).json({ message: 'Category not found' });
  }
 
  res.status(204).end();
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});
 
module.exports = router;