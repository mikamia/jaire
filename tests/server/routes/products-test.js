// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../../../server/db');
var supertest = require('supertest');

xdescribe('Products Route', function () {

  var app, User, Product, agent;

  beforeEach('Sync DB', function () {
    return db.sync({
      force: true
    });
  });

  beforeEach('Create app', function () {
    app = require('../../../server/app')(db);
    agent = supertest.agent(app);
    User = db.model('user');
    Product = db.model('product');
  });

  describe('GET /api/products', function () {
    it('should respond with an array via JSON', function (done) {
      return agent
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res) {
          // res.body is the JSON return object
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body).to.have.length(0);
        });
    });
  });
});