// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../../app');

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6ImlhZ28iLCJlbWFpbCI6ImlhZ29AZW1haWwuY29tIiwiaWF0IjoxNzA5OTQxOTAzfQ.MOHYVsDDyE5akYTSY3_fTNYAady5Ao3k-BCkn2xzDNtKgTNrS3B5LH-ZfKWzmHypYPFOX2aqvYp5TPJqCF9QrA';

describe('Testando rota (POST) para fazer login', () => {
  it('Autenticado com sucesso', async () => {
    await request(app)
      .post('/login')
      .set('Authentication', token)
      .send({
        nome: 'Test',
        email: 'test.test@email.com',
        senha: 'TestBlog@2024',
      })
      .expect(200);
  });
  it('Email inválido', async () => {
    await request(app)
      .post('/login')
      .set('Authentication', token)
      .send({
        email: 'testxxx.test@email.com',
        senha: 'TestBlog@2024',
      })
      .expect(401);
  });
  it('Senha inválida', async () => {
    await request(app)
      .post('/login')
      .set('Authentication', token)
      .send({
        email: 'test.test@email.com',
        senha: 'TestBlogxxx@2024',
      })
      .expect(401);
  });
  it('Dados de entrada inválidos', async () => {
    await request(app)
      .post('/login')
      .set('Authentication', token)
      .send()
      .expect(400);
  });
});
