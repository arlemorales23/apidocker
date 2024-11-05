const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/userModel');

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('username', 'testuser');
      expect(res.body.data).not.toHaveProperty('password');
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123'
        });
    });

    it('should login successfully', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@test.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.user).toHaveProperty('username', 'testuser');
    });
  });
});