const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Utilisateur', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    mot_de_passe: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'roles', key: 'id' },
    }
  }, {
    tableName: 'utilisateurs',
    timestamps: false,
  });
};