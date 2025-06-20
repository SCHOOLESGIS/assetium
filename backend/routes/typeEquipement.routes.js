const express = require('express');
const router = express.Router();
const { TypeEquipement } = require('../models');

// GET all types
router.get('/', async (req, res) => {
  try {
    const types = await TypeEquipement.findAll();
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET type by ID
router.get('/:id', async (req, res) => {
  try {
    const type = await TypeEquipement.findByPk(req.params.id);
    if (!type) return res.status(404).json({ message: 'Type non trouvé' });
    res.json(type);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create type
router.post('/', async (req, res) => {
  try {
    const newType = await TypeEquipement.create(req.body);
    res.status(201).json(newType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update type
router.put('/:id', async (req, res) => {
  try {
    const type = await TypeEquipement.findByPk(req.params.id);
    if (!type) return res.status(404).json({ message: 'Type non trouvé' });
    await type.update(req.body);
    res.json(type);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE type
router.delete('/:id', async (req, res) => {
  try {
    const type = await TypeEquipement.findByPk(req.params.id);
    if (!type) return res.status(404).json({ message: 'Type non trouvé' });
    await type.destroy();
    res.json({ message: 'Type supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;