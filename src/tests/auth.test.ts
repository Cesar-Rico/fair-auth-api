// src/tests/auth.test.ts

import request from 'supertest';
import app from '../app'; // Tu app Express

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
        password: '123456',
        name: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('username');
  });
  it('should fail to create user with invalid input', async () => {
    const res = await request(app)
        .post('/users')
        .send({
          user: 'janedoe',
          name: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
        });
        expect(res.statusCode).toBe(400);
        expect(res.body);
  })
});
