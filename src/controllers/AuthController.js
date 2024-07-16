const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const segredo = require('../config/segredo');

class AuthController {
  static async login(req, res) {
    const { email, senha } = req.body;
    const resultado = validationResult(req);
    try {
      if (!resultado.isEmpty()) {
        throw new Error('Dados de entrada inválidos.');
      }
      const usuario = await Usuario.findOne({
        where: { email },
      });
      if (!usuario) {
        throw new Error('Email inválido.');
      }
      const compararSenha = await bcrypt.compare(senha, usuario.senha);
      if (!compararSenha) {
        throw new Error('Senha inválida.');
      }
      const token = await jwt.sign({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        admin: usuario.admin,
      }, segredo, {
        algorithm: 'HS512',
        expiresIn: 60 * 60 * 3,  // 3 Horas
      });
      res.status(200).json({
        mensagem: 'Usuário autenticado com sucesso.',
        token,
        status: 200,
      });
    } catch (error) {
      if (error.message === 'Email inválido.') {
        res.status(401).json({
          mensagem: error.message,
          status: 401,
        });
      } else if (error.message === 'Senha inválida.') {
        res.status(401).json({
          mensagem: error.message,
          status: 401,
        });
      } else if (error.message === 'Dados de entrada inválidos.') {
        res.status(400).json({
          mensagem: error.message,
          erros: resultado.array(),
          status: 400,
        });
      }
    }
  }
}

module.exports = AuthController;
