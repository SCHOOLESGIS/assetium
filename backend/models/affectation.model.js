const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Affectation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'utilisateurs', key: 'id' },
    },
    equipement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'equipements', key: 'id' },
    },
    date_affectation: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    date_retour: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    }
  }, {
    tableName: 'affectations',
    timestamps: false,
  });
};