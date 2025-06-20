const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DATABASE_PORT
});

const Role = require('./role.model')(sequelize);
const Utilisateur = require('./utilisateur.model')(sequelize);
const TypeEquipement = require('./typeEquipement.model')(sequelize);
const Equipement = require('./equipement.model')(sequelize);
const Affectation = require('./affectation.model')(sequelize);
const Incident = require('./incident.model')(sequelize);
const Maintenance = require('./maintenance.model')(sequelize);
const Statistique = require('./statistique.model')(sequelize);

Role.hasMany(Utilisateur, { foreignKey: 'role_id' });
Utilisateur.belongsTo(Role, { foreignKey: 'role_id' });

TypeEquipement.hasMany(Equipement, { foreignKey: 'type_id' });
Equipement.belongsTo(TypeEquipement, { foreignKey: 'type_id' });

Utilisateur.hasMany(Affectation, { foreignKey: 'utilisateur_id' });
Affectation.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });

Equipement.hasMany(Affectation, { foreignKey: 'equipement_id' });
Affectation.belongsTo(Equipement, { foreignKey: 'equipement_id' });

Equipement.hasMany(Incident, { foreignKey: 'equipement_id' });
Incident.belongsTo(Equipement, { foreignKey: 'equipement_id' });

Equipement.hasMany(Maintenance, { foreignKey: 'equipement_id' });
Maintenance.belongsTo(Equipement, { foreignKey: 'equipement_id' });

Equipement.hasMany(Statistique, { foreignKey: 'equipement_id' });
Statistique.belongsTo(Equipement, { foreignKey: 'equipement_id' });

module.exports = {
  sequelize,
  Role,
  Utilisateur,
  TypeEquipement,
  Equipement,
  Affectation,
  Incident,
  Maintenance,
  Statistique
};
