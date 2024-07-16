// eslint-disable-next-line import/no-extraneous-dependencies
const { test } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

test('Testando rota inicial da API', async () => {
  await request(app)
    .get('/')
    .expect(200);
});
