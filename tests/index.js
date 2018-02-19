const request = require('supertest');
const app = require('../src/server');

describe('Endpoint test', () => {
  it('/ should be return 200', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((error) => {
        if (error) throw error;
        done();
      });
  });

  it('/something should be return 404', (done) => {
    request(app)
      .get('/something')
      .expect(404)
      .end(error => {
        if (error) throw error;
        done();
      });
  });
});
