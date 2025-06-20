const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Statistique', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    equipement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'equipements', key: 'id' },
    },
    utilisation_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    taux_disponibilite: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
    },
    date_calcul: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'statistiques',
    timestamps: false,
  });
};