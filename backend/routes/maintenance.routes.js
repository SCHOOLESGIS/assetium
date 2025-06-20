const express = require('express');
const router = express.Router();
const { Maintenance } = require('../models');

// GET all maintenances
router.get('/', async (req, res) => {
  try {
    const maintenances = await Maintenance.findAll();
    res.json(maintenances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET maintenance by ID
router.get('/:id', async (req, res) => {
  try {
    const maintenance = await Maintenance.findByPk(req.params.id);
    if (!maintenance) return res.status(404).json({ message: 'Maintenance non trouvée' });
    res.json(maintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create maintenance
router.post('/', async (req, res) => {
  try {
    const newMaintenance = await Maintenance.create(req.body);
    res.status(201).json(newMaintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update maintenance
router.put('/:id', async (req, res) => {
  try {
    const maintenance = await Maintenance.findByPk(req.params.id);
    if (!maintenance) return res.status(404).json({ message: 'Maintenance non trouvée' });
    await maintenance.update(req.body);
    res.json(maintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE maintenance
router.delete('/:id', async (req, res) => {
  try {
    const maintenance = await Maintenance.findByPk(req.params.id);
    if (!maintenance) return res.status(404).json({ message: 'Maintenance non trouvée' });
    await maintenance.destroy();
    res.json({ message: 'Maintenance supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;