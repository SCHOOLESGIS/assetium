const express = require('express');
const router = express.Router();
const { Statistique } = require('../models');

// GET all statistiques
router.get('/', async (req, res) => {
  try {
    const stats = await Statistique.findAll();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET statistique by ID
router.get('/:id', async (req, res) => {
  try {
    const stat = await Statistique.findByPk(req.params.id);
    if (!stat) return res.status(404).json({ message: 'Statistique non trouvée' });
    res.json(stat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create statistique
router.post('/', async (req, res) => {
  try {
    const newStat = await Statistique.create(req.body);
    res.status(201).json(newStat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update statistique
router.put('/:id', async (req, res) => {
  try {
    const stat = await Statistique.findByPk(req.params.id);
    if (!stat) return res.status(404).json({ message: 'Statistique non trouvée' });
    await stat.update(req.body);
    res.json(stat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE statistique
router.delete('/:id', async (req, res) => {
  try {
    const stat = await Statistique.findByPk(req.params.id);
    if (!stat) return res.status(404).json({ message: 'Statistique non trouvée' });
    await stat.destroy();
    res.json({ message: 'Statistique supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;