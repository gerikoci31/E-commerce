const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated products
    const tags = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag, 
        as: 'products' 
      }
    });
    
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find the tag by its ID and include associated products
    const tag = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        through: ProductTag, // Specify the through model for the many-to-many relationship
        as: 'products' // Alias used for the association if defined
      }
    });

    // Check if the tag was found
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    // Respond with the tag and its associated products
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Extract tag_name from request body
    const { tag_name } = req.body;

    // Validate that tag_name is provided
    if (!tag_name) {
      return res.status(400).json({ message: 'Tag name is required' });
    }

    // Create the new tag
    const newTag = await Tag.create({ tag_name });

    // Respond with the created tag
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    // Extract tag ID from URL parameters and new tag_name from request body
    const { id } = req.params;
    const { tag_name } = req.body;

    // Validate that tag_name is provided
    if (!tag_name) {
      return res.status(400).json({ message: 'Tag name is required' });
    }

    // Update the tag
    const [updated] = await Tag.update({ tag_name }, {
      where: { id },
      returning: true // This returns the updated rows
    });

    // Check if any rows were updated
    if (!updated) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Find and return the updated tag
    const updatedTag = await Tag.findByPk(id);
    res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Extract the tag ID from the URL parameters
    const { id } = req.params;

    // Find and delete the tag
    const deletedCount = await Tag.destroy({
      where: { id }
    });

    // Check if any rows were deleted
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Respond with a success message
    res.status(204).end(); // No content to send back for successful deletion
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
module.exports = router;
