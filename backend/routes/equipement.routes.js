const express = require('express');
const router = express.Router();
const { Equipement, TypeEquipement } = require('../models');

// GET all equipements
router.get('/', async (req, res) => {
  try {
    const equipements = await Equipement.findAll({include: {model: TypeEquipement, attributes: ['libelle']}});
    res.json(equipements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET equipement by ID
router.get('/:id', async (req, res) => {
  try {
    const equipement = await Equipement.findByPk(req.params.id);
    if (!equipement) return res.status(404).json({ message: 'Equipement non trouvé' });
    res.json(equipement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create equipement
router.post('/', async (req, res) => {
  try {
    const newEquipement = await Equipement.create(req.body);
    res.status(201).json(newEquipement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update equipement
router.put('/:id', async (req, res) => {
  try {
    const equipement = await Equipement.findByPk(req.params.id);
    if (!equipement) return res.status(404).json({ message: 'Equipement non trouvé' });
    await equipement.update(req.body);
    res.json(equipement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE equipement
router.delete('/:id', async (req, res) => {
  try {
    const equipement = await Equipement.findByPk(req.params.id);
    if (!equipement) return res.status(404).json({ message: 'Equipement non trouvé' });
    await equipement.destroy();
    res.json({ message: 'Equipement supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;