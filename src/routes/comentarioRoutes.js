const { Router } = require('express');
const { body } = require('express-validator');
const ComentarioController = require('../controllers/ComentarioController');
const autorizacao = require('../middlewares/autorizacao');

const comentarioRouter = Router();

comentarioRouter
  .post('/comentarios/', autorizacao, [
    body('conteudo').notEmpty().withMessage('É necessário inserir um Conteúdo para continuar.'),
    body('conteudo').isString().withMessage('Conteúdo tem de ser string.'),
    body('dataDeCriacao').notEmpty().withMessage('É necessário inserir uma Data de Criação para continuar.'),
    body('dataDeCriacao').isString().withMessage('Data de Criação tem de ser string.'),
    body('postagemId').notEmpty().withMessage('É necessário inserir uma Postagem para continuar.'),
    body('postagemId').isInt().withMessage('Postagem tem de ser um número inteiro.'),
    body('usuarioId').notEmpty().withMessage('É necessário inserir um Usuário para continuar.'),
    body('usuarioId').isInt().withMessage('Usuário tem de ser um número inteiro.'),
  ], ComentarioController.adicionar)
  .get('/comentarios/', ComentarioController.exibirTodos)
  .get('/comentarios/:id', ComentarioController.exibirUm)
  .put('/comentarios/:id', autorizacao, ComentarioController.atualizar)
  .delete('/comentarios/:id', autorizacao, ComentarioController.deletar)
  .put('/comentarios/:id/curtir', ComentarioController.curtir)
  .put('/comentarios/:id/descurtir', ComentarioController.descurtir);

module.exports = comentarioRouter;
