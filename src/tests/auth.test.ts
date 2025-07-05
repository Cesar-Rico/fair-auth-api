// src/tests/auth.test.ts

import request from 'supertest';
import app from '../app'; // Tu app Express
import { InitFairAuthLibOptions } from 'config/initFairAuthLib';

beforeAll(() => {
  // Inicializa hasher y token strategy para el entorno de test
  InitFairAuthLibOptions({
    hasher: { type: 'bcrypt', config: { saltRounds: 4 } },
    tokenStrategy: { type: 'jwt',  config: { secret: 'test-secret', expiresIn: '1h' } },
  });
});

describe('Auth Routes', () => {
  it('should return 200 on /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('OK');
  });

  it('should create a user and return hash', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        user: 'janedoe',
        password: 'Aa123456!',
        name: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('data.user', 'janedoe');
  });
  it('should fail to create user with duplicated username/email', async () => {
    const res = await request(app)
        .post('/users')
        .send({
          user: 'janedoe',  // mismo user/email → 400
          password: 'Aa123456!',
          name: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
        });
        expect(res.statusCode).toBe(400);
  })
});
