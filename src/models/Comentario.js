const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Postagem = require('./Postagem');
const Usuario = require('./Usuario');

const Comentario = sequelize.define('comentarios', {
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

Postagem.hasMany(Comentario);
Comentario.belongsTo(Postagem);
Usuario.hasMany(Comentario);
Comentario.belongsTo(Usuario);

// Comentario.sync({ force: true });

module.exports = Comentario;
