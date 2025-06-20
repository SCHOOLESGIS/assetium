// backend/databases/init-db.js

const { sequelize, Role, Utilisateur, TypeEquipement, Equipement, Affectation, Incident, Maintenance, Statistique } = require('../models');
const affectationsMock = require('./seeders/affectations.mock');
const equipementsMock = require('./seeders/equipements.mock');
const incidentsMock = require('./seeders/incidents.mock');
const maintenancesMock = require('./seeders/maintenances.mock');
const statistiquesMock = require('./seeders/statistiques.mock');
const typesEquipementsMock = require('./seeders/typesEquipements.mock');
const utilisateursMock = require('./seeders/utilisateurs.mock');
const bcrypt = require('bcrypt');

async function initDB() {
  try {
    // Synchronisation force true pour reset DB
    await sequelize.sync({ force: true });
    console.log('Base de données synchronisée.');

    // Insertion rôles (pas de mock car fixe)
    const rolesData = [
      { id: 1, nom: 'Administrateur' },
      { id: 2, nom: 'Technicien' },
      { id: 3, nom: 'Utilisateur' }
    ];
    await Role.bulkCreate(rolesData);
    console.log('Rôles insérés.');

    // Insertion types équipements
    await TypeEquipement.bulkCreate(typesEquipementsMock);
    console.log('Types d\'équipements insérés.');

    // Insertion utilisateurs avec hash du mot de passe
    for (const utilisateur of utilisateursMock) {
      const hashedPwd = await bcrypt.hash(utilisateur.mot_de_passe, 10);
      await Utilisateur.create({
        nom: utilisateur.nom,
        email: utilisateur.email,
        mot_de_passe: hashedPwd,
        role_id: utilisateur.role_id
      });
    }
    console.log('Utilisateurs insérés.');

    // Insertion équipements
    await Equipement.bulkCreate(equipementsMock);
    console.log('Équipements insérés.');

    // Insertion affectations
    await Affectation.bulkCreate(affectationsMock);
    console.log('Affectations insérées.');

    // Insertion incidents
    await Incident.bulkCreate(incidentsMock);
    console.log('Incidents insérés.');

    // Insertion maintenances
    await Maintenance.bulkCreate(maintenancesMock);
    console.log('Maintenances insérées.');

    // Insertion statistiques
    await Statistique.bulkCreate(statistiquesMock);
    console.log('Statistiques insérées.');

    console.log('Initialisation de la base de données terminée avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base :', error);
  } finally {
    // await sequelize.close();
    // console.log('Connexion à la base fermée.');
  }
}

module.exports = initDB;