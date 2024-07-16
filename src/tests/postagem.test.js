// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../../app');

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6ImlhZ28iLCJlbWFpbCI6ImlhZ29AZW1haWwuY29tIiwiaWF0IjoxNzA5OTQxOTAzfQ.MOHYVsDDyE5akYTSY3_fTNYAady5Ao3k-BCkn2xzDNtKgTNrS3B5LH-ZfKWzmHypYPFOX2aqvYp5TPJqCF9QrA';
let idPostagem;

describe('Testando rota (POST) para inserir uma postagem', () => {
  it('Adicionado com sucesso', async () => {
    const response = await request(app)
      .post('/postagens/')
      .set('Authorization', token)
      .send({
        titulo: 'teste',
        conteudo: 'teste',
        dataDeCriacao: '01/01/01',
        usuarioId: 2
      })
      .expect(201)

    idPostagem = response.body.postagem.id
  })
  it('Forçar dados de entrada inválidos', async () => {
    await request(app)
      .post('/postagens/')
      .set('Authorization', token)
      .send()
      .expect(400)
  })
  it('Forçar erro de chave estrangeira de usuários', async () => {
    await request(app)
      .post('/postagens/')
      .set('Authorization', token)
      .send({
        titulo: 'teste',
        conteudo: 'teste',
        dataDeCriacao: '01/01/01',
        usuarioId: 0
      })
  })
})

describe('Rota (GET) para todas as postagens', () => {
  it('Exibir todos com sucesso', async () => {
    await request(app)
      .get('/postagens')
      .expect(200)
  })
})

describe('Rota (GET) para apenas uma postagem', () => {
  it('Exibir um com sucesso', async () => {
    await request(app)
      .get(`/postagens/${idPostagem}`)
      .expect(200)
  })
  it('Forçar erro de id inexistente', async () => {
    await request(app)
      .get('/postagens/0')
      expect(400)
  })
})

describe('Rota (PUT) para alterar uma postagem', () => {
  it('Alterado com sucesso', async () => {
    await request(app)
      .put(`/postagens/${idPostagem}`)
      .set('Authorization', token)
      .send({
        titulo: 'xxxx',
        conteudo: 'xxxxxx',
        dataDeCriacao: '01/01/01',
        usuarioId: 2
      })
      .expect(200)    
  })
  it('Forçar falha de id inexistente', async () => {
    await request(app)
      .put('/postagens/0')
      .set('Authorization', token)
      .send({
        titulo: 'xxxx',
        conteudo: 'xxxxxx',
        dataDeCriacao: '01/01/01',
        usuarioId: 2
      })
      .expect(400)
  })
})

describe('Rota (PUT) para curtir uma postagem', () => {
  it('Curtido com sucesso', async () => {
    await request(app)
    .put(`/postagens/${idPostagem}/curtir`)
    .set('Authorization', token)
    .expect(200)
  })
  it('Forçar falha para id inexistente', async () => {
    await request(app)
    .put('/postagens/0/curtir')
    .set('Authorization', token)
    .expect(400)
  })
})

describe('Rota (PUT) para descurtir uma postagem', () => {
  it('Desurtido com sucesso', async () => {
    await request(app)
    .put(`/postagens/${idPostagem}/descurtir`)
    .set('Authorization', token)
    .expect(200)
  })
  it('Forçar falha para id inexistente', async () => {
    await request(app)
    .put('/postagens/0/descurtir')
    .set('Authorization', token)
    .expect(400)
  })
})

describe('Rota (DELETE) para deletar uma postagem', () => {
  it('Deletado com sucesso', async () => {
    await request(app)
      .delete(`/postagens/${idPostagem}`)
      .set('Authorization', token)
      .expect(200)
  })
  it('Forçar falha de id inexistente', async () => {
    await request(app)
      .delete('/postagens/0')
      .set('Authorization', token)
      .expect(400)
  })
})