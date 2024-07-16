// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../../app');

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6ImlhZ28iLCJlbWFpbCI6ImlhZ29AZW1haWwuY29tIiwiaWF0IjoxNzA5OTQxOTAzfQ.MOHYVsDDyE5akYTSY3_fTNYAady5Ao3k-BCkn2xzDNtKgTNrS3B5LH-ZfKWzmHypYPFOX2aqvYp5TPJqCF9QrA';
let idComentario;
describe('Testando rota (POST) para inserir um comentário', () => {
  it('Adicionado com sucesso', async () => {
    const response = await request(app)
      .post('/comentarios')
      .set('Authorization', token)
      .send({
        conteudo: 'teste',
        dataDeCriacao: '01/01/01',
        postagemId: 2,
        usuarioId: 2
      })
      .expect(201)
    idComentario = response.body.comentario.id
  });
  it('Dados de entrada inválidos', async () => {
    await request(app)
      .post('/comentarios')
      .set('Authorization', token)
      .send()
      .expect(400)
  })
  it('Falha ao inserir chave estrangeira de postagens', async () => {
    await request(app)
      .post('/comentarios')
      .set('Authorization', token)
      .send({
        conteudo: 'teste',
        dataDeCriacao: '01/01/01',
        postagemId: 0,
        usuarioId: 2
      })
      .expect(400)
  })
  it('Falha ao inserir chave estrangeira de usuários', async () => {
    await request(app)
      .post('/comentarios')
      .set('Authorization', token)
      .send({
        conteudo: 'teste',
        dataDeCriacao: '01/01/01',
        postagemId: 2,
        usuarioId: 0
      })
      .expect(400)
  })
});

describe('Rota (GET) para todos os comentários', () => {
  it('Exibir todos com sucesso', async () => {
    await request(app)
    .get('/comentarios')
    .expect(200)
  });
});

describe('Rota (GET) para um comentário', () => {
  it('Exibir um com sucesso.', async () => {
    await request(app)
      .get(`/comentarios/${idComentario}`)
      .expect(200)
  });
  it('Falha ao consultar id inexistente', async () => {
    await request(app)
      .get('/comentarios/0')
      .expect(400)
  })
});

describe('Rota (PUT) para alterar um comentário', () => {
  it('Alterarado com sucesso', async () => {
    await request(app)
      .put(`/comentarios/${idComentario}`)
      .set('Authorization', token)
      .send({
        conteudo: 'teste',
        dataDeCriacao: '01/01/01',
        postagemId: 2,
        usuarioId: 2
      })
      .expect(200)
  });
  it('Falha ao alterar registro onde o id não existe', async () => {
    await request(app)
      .put('/comentarios/0')
      .set('Authorization', token)
      .send({
        conteudo: 'teste',
        dataDeCriacao: '01/01/01',
        postagemId: 2,
        usuarioId: 2
      })
      .expect(400)
  })
});

describe('Rota (PUT) para curtir comentário', () => {
  it('Curtir com sucesso', async () => {
    await request(app)
      .put(`/comentarios/${idComentario}/curtir`)
      .set('Authorization', token)
      .expect(200)
  });
  it('Curtir comentário onde o id não existe', async () => {
    await request(app)
      .put('/comentarios/0/curtir')
      .set('Authorization', token)
      .expect(400)
  })
});


describe('Rota (PUT) para descurtir comentário', () => {
  it('Descurtir com sucesso', async () => {
    await request(app)
      .put(`/comentarios/${idComentario}/descurtir`)
      .set('Authorization', token)
      .expect(200)
  });
  it('Descurtir cometário onde o id não existe', async () => {
    await request(app)
      .put('/comentarios/0/descurtir')
      .set('Authorization', token)
      .expect(400)
  })
});

describe('Rota (DELETE) para deletar um comentário', () => {
  it('Deletado com sucesso', async () => {
    await request(app)
      .delete(`/comentarios/${idComentario}`)
      .set('Authorization', token)
      .expect(200)
  });
  it('Deletar registro onde o id não existe', async () => {
    await request(app)
      .delete('/comentarios/0')
      .set('Authorization', token)
      .expect(400)
  })
});

