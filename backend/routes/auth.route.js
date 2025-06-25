const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const { Utilisateur, Role } = require('../models')

router.post('/login', async (req, res) => {
  const { email, mot_de_passe } = req.body
  try {
    const user = await Utilisateur.findOne({ where: { email }, include: {model: Role, attributes: ['nom']} })
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })

    const isValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe)
    if (!isValid) return res.status(401).json({ message: 'Mot de passe incorrect' })

    const token = jwt.sign(
      { id: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    console.log(user)
    const user_to_return = {id: user.id, nom: user.nom, email: user.email, role: user.Role.nom};

    res.json({ user: user_to_return, token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router