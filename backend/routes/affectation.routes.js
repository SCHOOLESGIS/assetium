const express = require('express');
const router = express.Router();
const { Affectation } = require('../models');

// GET all affectations
router.get('/', async (req, res) => {
  try {
    const affectations = await Affectation.findAll();
    res.json(affectations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET affectation by ID
router.get('/:id', async (req, res) => {
  try {
    const affectation = await Affectation.findByPk(req.params.id);
    if (!affectation) return res.status(404).json({ message: 'Affectation non trouvée' });
    res.json(affectation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create affectation
router.post('/', async (req, res) => {
  try {
    const newAffectation = await Affectation.create(req.body);
    res.status(201).json(newAffectation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update affectation
router.put('/:id', async (req, res) => {
  try {
    const affectation = await Affectation.findByPk(req.params.id);
    if (!affectation) return res.status(404).json({ message: 'Affectation non trouvée' });
    await affectation.update(req.body);
    res.json(affectation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE affectation
router.delete('/:id', async (req, res) => {
  try {
    const affectation = await Affectation.findByPk(req.params.id);
    if (!affectation) return res.status(404).json({ message: 'Affectation non trouvée' });
    await affectation.destroy();
    res.json({ message: 'Affectation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;