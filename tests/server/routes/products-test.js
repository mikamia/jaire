// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../../../server/db');
var supertest = require('supertest');

describe('Products Route', function () {

  var app, User, Product, agent;

  beforeEach('Sync DB', function () {
    return db.sync({
      force: true
    });
  });

  beforeEach('Create app', function () {
    app = require('../../../server/app')(db);
    User = db.model('user');
    Product = db.model('product');
    agent = supertest.agent(app);
  });

  xdescribe('GET /api/products', function () {

    it('no products created yet, array of 0', function (done) {
      agent
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err,res) {
          // res.body is the JSON return object
          if(err) return done(err);
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body).to.have.length(0);
          done();
        });
    });
  });
});
