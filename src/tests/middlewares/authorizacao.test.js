// eslint-disable-next-line import/no-extraneous-dependencies
const { describe, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../../app');

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6ImlhZ28iLCJlbWFpbCI6ImlhZ29AZW1haWwuY29tIiwiaWF0IjoxNzA5OTQxOTAzfQ.MOHYVsDDyE5akYTSY3_fTNYAady5Ao3k-BCkn2xzDNtKgTNrS3B5LH-ZfKWzmHypYPFOX2aqvYp5TPJqCF9QrA';
const tokenExpirado = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsIm5vbWUiOiJpYWdvIiwiZW1haWwiOiJpYWdvQGVtYWlsLmNvbSIsImlhdCI6MTcxMDI4MjU1MiwiZXhwIjoxNzEwMjgyNTUzfQ.E8aRBJqY73zIf0tIMTcHnZOOKdRe6mSjHTjHwfnSfttolcxCZPKU6KcsyZbmvhM2-m72MtJFn1peD1qlMauv3A'
const tokenInvalido = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6ImlhZ28iLCJlbWFpbCI6ImlhZ29AZW1haWwuY29tIiwiaWF0IjoxNzA5OTQxOTAzfQ.MOHYVsDDyE5akYTSY3_fTNYAady5Ao3k-BCkn2xzDNtKgTNrS3B5LH-ZfKWzmHypYPFOX2aqvYp5TPJqCF9Qrx'

describe('Teste middleware de autorização', () => {
  it('Autorizado', async () => {
    await request(app)
      .get('/usuarios')
      .set('Authorization', token)
      .expect(200)
  })
  it('Sem token em no header', async () => {
    await request(app)
      .get('/usuarios')
      .expect(401)
  })
  it('Token mau formatado', async () => {
    await request(app)
      .get('/usuarios')
      .set('Authorization', 'xxx')
      .expect(401)
  })
  it('token expirado', async () => {
    await request(app)
      .get('/usuarios')
      .set('Authorization', tokenExpirado)
      .expect(401)
  })
  it('token inválido', async () => {
    await request(app)
      .get('/usuarios')
      .set('Authorization', tokenInvalido)
      .expect(401)
  })
})