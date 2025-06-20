const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Equipement', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    marque: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    modele: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    numero_serie: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    date_acquisition: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    etat: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'en service',
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'types_equipements', key: 'id' },
    }
  }, {
    tableName: 'equipements',
    timestamps: false,
  });
};