const initDB = require('./databases/init-db');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config()

const authRoute = require('./routes/auth.route')
const verifyToken = require('./middlewares/jwt')

const whitelist = ['http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Autorise les requêtes sans origine (ex: postman)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}; 


app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

const roleRoutes = require('./routes/role.routes');
const utilisateurRoutes = require('./routes/utilisateur.routes');
const typeEquipementRoutes = require('./routes/typeEquipement.routes');
const equipementRoutes = require('./routes/equipement.routes');
const affectationRoutes = require('./routes/affectation.routes');
const incidentRoutes = require('./routes/incident.routes');
const maintenanceRoutes = require('./routes/maintenance.routes');
const statistiqueRoutes = require('./routes/statistique.routes');


app.use('/api/auth', authRoute)
app.use('/api/roles',verifyToken, roleRoutes);
app.use('/api/utilisateurs',verifyToken, utilisateurRoutes);
app.use('/api/types-equipements',verifyToken, typeEquipementRoutes);
app.use('/api/equipements',verifyToken, equipementRoutes);
app.use('/api/affectations',verifyToken, affectationRoutes);
app.use('/api/incidents',verifyToken, incidentRoutes);
app.use('/api/maintenances',verifyToken, maintenanceRoutes);
app.use('/api/statistiques',verifyToken, statistiqueRoutes);

initDB()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});