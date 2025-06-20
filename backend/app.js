const initDB = require('./databases/init-db');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
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

app.use('/api/roles', roleRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/types-equipements', typeEquipementRoutes);
app.use('/api/equipements', equipementRoutes);
app.use('/api/affectations', affectationRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/maintenances', maintenanceRoutes);
app.use('/api/statistiques', statistiqueRoutes);

initDB()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});