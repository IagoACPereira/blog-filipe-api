const { validationResult } = require('express-validator');
const Comentario = require('../models/Comentario');

class ComentarioController {
  static async adicionar(req, res) {
    const {
      conteudo,
      dataDeCriacao,
      postagemId,
      usuarioId,
    } = req.body;
    const resultado = validationResult(req);
    try {
      if (!resultado.isEmpty()) {
        throw new Error('Dados de entrada inválidos.');
      }
      const comentario = await Comentario.create({
        conteudo,
        dataDeCriacao,
        postagenId: postagemId,
        usuarioId,
      });
      res.status(201).json({
        mensagem: 'Comentário adicionado com sucesso.',
        comentario,
        status: 201,
      });
    } catch (error) {
      if (error.message === 'Dados de entrada inválidos.') {
        res.status(400).json({
          mensagem: error.message,
          erros: resultado.array(),
          status: 400,
        });
      } else if (error.message === 'insert or update on table "comentarios" violates foreign key constraint "comentarios_postagenId_fkey"' || error.message === 'inserção ou atualização em tabela "comentarios" viola restrição de chave estrangeira "comentarios_postagenId_fkey"') {
        res.status(400).json({
          mensagem: `Não existe Postagem com o id ${postagemId}.`,
          status: 400,
        });
      } else if (error.message === 'insert or update on table "comentarios" violates foreign key constraint "comentarios_usuarioId_fkey"' || error.message === 'inserção ou atualização em tabela "comentarios" viola restrição de chave estrangeira "comentarios_usuarioId_fkey"') {
        res.status(400).json({
          mensagem: `Não existe Usuário com o id ${usuarioId}.`,
          status: 400,
        });
      }
    }
  }

  static async exibirTodos(req, res) {
    try {
      const comentario = await Comentario.findAndCountAll();
      res.status(200).json(comentario);
    } finally {}
  }

  static async exibirUm(req, res) {
    const { id } = req.params;
    try {
      const comentario = await Comentario.findOne({
        where: { id },
      });
      if (!comentario) {
        throw new Error(`Não existe Comentário com o id ${id}`);
      }
      res.status(200).json(comentario);
    } catch (error) {
      if (error.message === `Não existe Comentário com o id ${id}`) {
        res.status(400).json({
          mensagem: error.message,
          status: 400,
        });
      }
    }
  }

  static async atualizar(req, res) {
    const {
      conteudo,
      dataDeCriacao,
      postagemId,
      usuarioId,
    } = req.body;
    const { id } = req.params;
    try {
      const comentario = await Comentario.findOne({
        where: { id },
      });
      if (!comentario) {
        throw new Error(`Não existe Comentário com o id ${id}`);
      }
      await Comentario.update({
        conteudo,
        dataDeCriacao,
        postagenId: postagemId,
        usuarioId,
      }, {
        where: { id },
      });
      res.status(200).json({
        mensagem: 'Comentário atualizado com sucesso.',
        status: 200,
      });
    } catch (error) {
      if (error.message === `Não existe Comentário com o id ${id}`) {
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
      const comentario = await Comentario.findOne({
        where: { id },
      });
      if (!comentario) {
        throw new Error(`Não existe Comentário com o id ${id}`);
      }
      await Comentario.destroy({
        where: { id },
      });
      res.status(200).json({
        mensagem: 'Comentário deletado com sucesso.',
        status: 200,
      });
    } catch (error) {
      if (error.message === `Não existe Comentário com o id ${id}`) {
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
      const comentario = await Comentario.findOne({
        where: { id },
      });
      if (!comentario) {
        throw new Error(`Não existe Comentário com o id ${id}`);
      }
      await Comentario.update({ curtidas: comentario.curtidas + 1 }, {
        where: { id },
      });
      res.status(200).json({
        mensagem: 'Você curtiu o comentário',
        status: 200,
      });
    } catch (error) {
      if (error.message === `Não existe Comentário com o id ${id}`) {
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
      const comentario = await Comentario.findOne({
        where: { id },
      });
      if (!comentario) {
        throw new Error(`Não existe Comentário com o id ${id}`);
      }
      await Comentario.update({ descurtidas: comentario.descurtidas + 1 }, {
        where: { id },
      });
      res.status(200).json({
        mensagem: 'Você descurtiu o comentário.',
        status: 200,
      });
    } catch (error) {
      if (error.message === `Não existe Comentário com o id ${id}`) {
        res.status(400).json({
          mensagem: error.message,
          status: 400,
        });
      }
    }
  }
}

module.exports = ComentarioController;
