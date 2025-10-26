
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware'); // Import upload middleware
const Plant = require('../models/plant.model');

// @route   POST api/plants
// @desc    Create a new plant for the logged-in user
// @access  Private
router.post('/', [authMiddleware, upload.single('image')], async (req, res) => {
  console.log('POST /api/plants hit');
  console.log('Request Body:', req.body);
  console.log('Request File:', req.file);
  try {
    const { name, species, birthDate } = req.body;
    const userId = req.user.id; // We get this from the authMiddleware

    const newPlantData = {
      name,
      species,
      birthDate,
      user: userId
    };

    if (req.file) {
      // In Windows, path contains backslashes. Replace them with forward slashes for URL compatibility.
      newPlantData.imageUrl = req.file.path.replace(/\\/g, "/");
    }

    const newPlant = new Plant(newPlantData);

    const plant = await newPlant.save();
    res.status(201).json(plant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/plants
// @desc    Get all plants for the logged-in user
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Find plants that belong to the user ID from the token
    const plants = await Plant.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(plants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/plants/:id
// @desc    Get a single plant by its ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ msg: 'Plant not found' });
    }

    // Ensure the user owns the plant
    if (plant.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(plant);
  } catch (err) {
    console.error(err.message);
    // If the ID is not a valid ObjectId, it will throw an error
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Plant not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
