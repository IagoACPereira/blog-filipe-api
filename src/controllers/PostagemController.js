const { validationResult } = require('express-validator');
const Comentario = require('../models/Comentario');
const Postagem = require('../models/Postagem');
const Usuario = require('../models/Usuario');

class PostagemController {
  static async adicionar(req, res) {
    const {
      titulo,
      conteudo,
      dataDeCriacao,
      usuarioId,
    } = req.body;
    const resultado = validationResult(req);
    try {
      if (!resultado.isEmpty()) {
        throw new Error('Dados de entrada inválidos.');
      }
      const postagem = await Postagem.create({
        titulo,
        conteudo,
        dataDeCriacao,
        usuarioId,
      });
      res.status(201).json({
        mensagem: 'Postagem adicionada com sucesso.',
        postagem,
        status: 201,
      });
    } catch (error) {
      if (error.message === 'Dados de entrada inválidos.') {
        res.status(400).json({
          mensagem: error.message,
          erros: resultado.array(),
          status: 400,
        });
      } else if (error.message === 'insert or update on table "postagens" violates foreign key constraint "postagens_usuarioId_fkey"' || error.message === 'inserção ou atualização em tabela "postagens" viola restrição de chave estrangeira "postagens_usuarioId_fkey"') {
        res.status(400).json({
          mensagem: `Não existe Usuário com o id ${usuarioId}`,
          status: 400,
        });
      }
    }
  }

  static async exibirTodos(req, res) {
    try {
      const postagens = await Postagem.findAndCountAll({
        attributes: ['id', 'titulo', 'conteudo', 'dataDeCriacao', 'curtidas', 'descurtidas'],
        include: {
          model: Usuario,
          attributes: ['id', 'nome'],
        },
      });
      res.status(200).json(postagens);
    } finally {}
  }

  static async exibirUm(req, res) {
    const { id } = req.params;
    try {
      const postagem = await Postagem.findOne({
        attributes: ['id', 'titulo', 'conteudo', 'dataDeCriacao', 'curtidas', 'descurtidas'],
        where: { id },
        include: [
          {
            model: Usuario,
            attributes: ['id', 'nome', 'email'],
          },
          {
            model: Comentario,
            attributes: ['id', 'conteudo', 'dataDeCriacao', 'curtidas', 'descurtidas'],
            include: {
              model: Usuario,
              attributes: ['id', 'nome', 'email'],
            },
          },
        ],
      });
      if (!postagem) {
        throw new Error(`Não existe Postagem com o id ${id}`);
      }
      res.status(200).json(postagem);
    } catch (error) {
      if (error.message === `Não existe Postagem com o id ${id}`) {
        res.status(400).json({
          mensagem: error.message,
          status: 400,
        });
      }
    }
  }

  static async atualizar(req, res) {
    const {
      titulo,
      conteudo,
      dataDeCriacao,
      usuarioId,
    } = req.body;
    const { id } = req.params;
    try {
      const postagem = await Postagem.findOne({
        where: { id },
      });
      if (!postagem) {
        throw new Error(`Não existe Postagem com o id ${id}`);
      }
      await Postagem.update({
        titulo,
        conteudo,
        dataDeCriacao,
        usuarioId,
      }, {
        where: { id },
      });
      res.status(200).json({
        mensagem: 'Postagem atualizada com sucesso.',
        status: 200,
      });
    } catch (error) {
      if (error.message === `Não existe Postagem com o id ${id}`) {
        res.status(400).json({
          mensagem: error.message,
          status: 400,
        });
      }
    }
  }

  static async deletar(req, res) {
    const { id } = req.params;
    try {
      const postagem = await Postagem.findOne({
        where: { id },
      });
      if (!postagem) {
        throw new Error(`Não existe Postagem com o id ${id}`);
      }
      await Postagem.destroy({
        where: { id },
      });
      res.status(200).json({
        mensagem: 'Postagem deletada com sucesso.',
        status: 200,
      });
    } catch (error) {
      if (error.message === `Não existe Postagem com o id ${id}`) {
        res.status(400).json({
          mensagem: error.message,
          status: 400,
        });
      }
    }
  }

  static async curtir(req, res) {
    const { id } = req.params;
    try {
      const postagem = await Postagem.findOne({
        where: { id },
      });
      if (!postagem) {
        throw new Error(`Não existe Postagem com o id ${id}`);
      }
      await Postagem.update({ curtidas: postagem.curtidas + 1 }, {
        where: { id },
      });
      res.status(200).json({
        mensagem: `Você curtiu a postagem ${postagem.titulo}`,
        status: 200,
      });
    } catch (error) {
      if (error.message === `Não existe Postagem com o id ${id}`) {
        res.status(400).json({
          mensagem: error.message,
          status: 400,
        });
      }
    }
  }

  static async descurtir(req, res) {
    const { id } = req.params;
    try {
      const postagem = await Postagem.findOne({
        where: { id },
      });
      if (!postagem) {
        throw new Error(`Não existe Postagem com o id ${id}`);
      }
      await Postagem.update({ descurtidas: postagem.descurtidas + 1 }, {
        where: { id },
      });
      res.status(200).json({
        mensagem: `Você descurtiu a postagem ${postagem.titulo}`,
        status: 200,
      });
    } catch (error) {
      if (error.message === `Não existe Postagem com o id ${id}`) {
        res.status(400).json({
          mensagem: error.message,
          status: 400,
        });
      }
    }
  }
}

module.exports = PostagemController;
