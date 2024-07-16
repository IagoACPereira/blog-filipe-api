const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Postagem = sequelize.define('postagens', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dataDeCriacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  curtidas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  descurtidas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, { timestamps: false });

Usuario.hasMany(Postagem);
Postagem.belongsTo(Usuario);

// Postagem.sync({ force: true });

module.exports = Postagem;
