// Instantiate all models
var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../../../server/db');
var supertest = require('supertest');

describe('Products Route', function () {

  var app, User, Product, agent, ferryProduct;

  ferryProduct = {name: 'Staten Island Ferry',
        description: 'Smells like fish and desperation.',
        price: '67.99',
        imageUrl: '',
        tags: ["Premium", "Urban", "Water"]};

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
        .expect(function(res) {
          console.log(res.body);
        })
        .expect(200, [], done);
    });
    
    it('should return products when there are products in the database', function(done) {
      Product.create(ferryProduct)
      .then(function(product) {
        return agent
        .get('/api/products')
        .expect(function(res) {
          console.log(res.body);
        })
        .expect(200)
        .end(done);
        // .expect function(response) {
        //   console.log(response.body);
        //   // delete response[0].createdAt;
        //   // delete response[0].updatedAt;
        //   // console.log(response);
        //   // expect(response).to.eql([ferryProduct]);
        // }, done);
      });
    });
  });
});