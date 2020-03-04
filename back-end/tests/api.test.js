const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

describe('api', () => {
  afterAll((done) => {
    mongoose.disconnect();
    app.close(done);
  });

  test('login with correct email and password', () =>
    request(app).post('/api/auth/signin')
    .send({
      email: 'morioyoshida@gmail.com',
      password: 'morio',
    }).then((response) => {
      expect(response.statusCode).toBe(200);
    })
  );

  test('login with incorrect email and password', () =>
    request(app).post('/api/auth/signin')
    .send({
      email: 'test@gmail.com',
      password: 'test',
    }).then((response) => {
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Email or password is not correct');
    })
  );
});
