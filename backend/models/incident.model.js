const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Incident', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_signalement: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    statut: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'ouvert',
    },
    gravite: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'moyen',
    }
  }, {
    tableName: 'incidents',
    timestamps: false,
  });
};
