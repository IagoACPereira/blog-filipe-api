/* eslint-disable arrow-body-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../../app');

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6ImlhZ28iLCJlbWFpbCI6ImlhZ29AZW1haWwuY29tIiwiaWF0IjoxNzA5OTQxOTAzfQ.MOHYVsDDyE5akYTSY3_fTNYAady5Ao3k-BCkn2xzDNtKgTNrS3B5LH-ZfKWzmHypYPFOX2aqvYp5TPJqCF9QrA';
let idUsuario;
describe('Testando rota (POST) para inserir um usuário', () => {
  it('Adicionado com sucesso.', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({
        nome: 'teste',
        email: 'teste@teste.com',
        senha: 'Senha@123',
      })
      .expect(201);
    idUsuario = response.body.usuario.id;
  });
  it('Dados de entrada inválidos', async () => {
    await request(app)
      .post('/usuarios')
      .send()
      .expect(400);
  });
});

describe('Rota (GET) para todos os Usuários', () => {
  it('Exibir com sucesso.', async () => {
    await request(app)
      .get('/usuarios')
      .set('Authorization', token)
      .expect(200);
  });
});

describe('Rota (GET) para um usuário', () => {
  it('Exibir com sucesso', async () => {
    await request(app)
      .get(`/usuarios/${idUsuario}`)
      .set('Authorization', token)
      .expect(200);
  });
  it('Erro ID inexistente.', async () => {
    await request(app)
      .get('/usuarios/0')
      .set('Authorization', token)
      .expect(400);
  });
});

describe('Rota (PUT) para alterar um usuário', () => {
  it('Alterado com sucesso', async () => {
    await request(app)
      .put(`/usuarios/${idUsuario}`)
      .set('Authorization', token)
      .send({
        nome: 'teste2',
        email: 'teste2@teste.com',
        senha: 'Senha@123',
      })
      .expect(200);
  });
  it('Erro ID inexistente.', async () => {
    await request(app)
      .put('/usuarios/0')
      .set('Authorization', token)
      .expect(400);
  });
});

describe('Rota (DELETE) para deletar um usuário', () => {
  it('Deletado com sucesso', async () => {
    await request(app)
      .delete(`/usuarios/${idUsuario}`)
      .set('Authorization', token)
      .expect(200);
  });
  it('Erro ID inexistente.', async () => {
    await request(app)
      .delete('/usuarios/0')
      .set('Authorization', token)
      .expect(400);
  });
});

// describe('', () => {
//   it('', async () => {

//   });
// });
