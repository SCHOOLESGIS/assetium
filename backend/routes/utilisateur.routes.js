const express = require('express');
const router = express.Router();

const { Utilisateur } = require('../models'); // ton modèle Sequelize


router.get('/get-current-user', (req, res) => {
  res.json(
    {
      "user": req.user
    }
  )
});

// GET tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await Utilisateur.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET utilisateur par id
router.get('/:id', async (req, res) => {
  try {
    const user = await Utilisateur.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST création utilisateur
router.post('/', async (req, res) => {
  try {
    const newUser = await Utilisateur.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT mise à jour utilisateur
router.put('/:id', async (req, res) => {
  try {
    const user = await Utilisateur.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE utilisateur
router.delete('/:id', async (req, res) => {
  try {
    const user = await Utilisateur.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    await user.destroy();
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;