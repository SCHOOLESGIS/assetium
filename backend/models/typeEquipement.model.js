const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('TypeEquipement', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  }, {
    tableName: 'types_equipements',
    timestamps: false,
  });
};