const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Maintenance', {
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
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    commentaire: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date_maintenance: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'maintenances',
    timestamps: false,
  });
};