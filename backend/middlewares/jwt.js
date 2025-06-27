const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(403).json({ message: 'Token manquant' })
  }

  const actualToken = token.split(' ')[1] // Format "Bearer <token>"
  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' })
    }
    req.user = decoded
    next()
  })
}

module.exports = verifyToken