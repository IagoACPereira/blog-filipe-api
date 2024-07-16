const { Router } = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/AuthController');

const authRouter = Router();

authRouter
  .post('/login/', [
    body('email').notEmpty().withMessage('E necessário inserir o Email para autenticar.'),
    body('email').isEmail().withMessage('Email ter de ser um Email válido.'),
    body('senha').notEmpty().withMessage('E necessário inserir a Senha para autenticar.'),
    body('senha').isStrongPassword().withMessage('A Senha precisa ser forte. Deve conter: "Letra maiúscula", "Caractere especial", "Valores numéricos".'),
  ], AuthController.login);

module.exports = authRouter;
