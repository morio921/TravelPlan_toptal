const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

describe('api', () => {
  afterAll((done) => {
    mongoose.disconnect();
    app.close(done);
  });

  test('should login with correct credentials', () =>
    request(app).post('/api/auth/signin')
    .send({
      email: 'morioyoshida@gmail.com',
      password: 'morio',
    }).then((resp) => {
      expect(resp.statusCode).toBe(200);
    })
  );
});
