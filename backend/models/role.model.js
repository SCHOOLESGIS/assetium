const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'roles',
    timestamps: false,
  });
};
