const express = require('express');
const router = express.Router();
const { Role } = require('../models');

// GET all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET role by ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role non trouvé' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create role
router.post('/', async (req, res) => {
  try {
    const newRole = await Role.create(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update role
router.put('/:id', async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role non trouvé' });
    await role.update(req.body);
    res.json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE role
router.delete('/:id', async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role non trouvé' });
    await role.destroy();
    res.json({ message: 'Role supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;