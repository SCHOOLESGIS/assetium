const express = require('express');
const router = express.Router();
const { Incident } = require('../models');

// GET all incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.findAll();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET incident by ID
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findByPk(req.params.id);
    if (!incident) return res.status(404).json({ message: 'Incident non trouvé' });
    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create incident
router.post('/', async (req, res) => {
  try {
    const newIncident = await Incident.create(req.body);
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update incident
router.put('/:id', async (req, res) => {
  try {
    const incident = await Incident.findByPk(req.params.id);
    if (!incident) return res.status(404).json({ message: 'Incident non trouvé' });
    await incident.update(req.body);
    res.json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE incident
router.delete('/:id', async (req, res) => {
  try {
    const incident = await Incident.findByPk(req.params.id);
    if (!incident) return res.status(404).json({ message: 'Incident non trouvé' });
    await incident.destroy();
    res.json({ message: 'Incident supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;