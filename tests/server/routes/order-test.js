//npm run testRoutes

var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../../../server/db');
var supertest = require('supertest');

describe('Order Routes', function () {

    var app, Order, agent;

    beforeEach('Sync DB', function () {
        return db.sync({force: true});
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Order = db.model('order');
        agent = supertest.agent(app);
    });

    describe('CRUD orders', function () {

        var orderA, orderB, orderC;

        beforeEach(function () {
          var promise1 = Order.create({
                //id: 001,
                status: 'in cart'
            });

            var promise2 = Order.create({
                //id: 002,
                status: 'shipped'
            });

            var promise3 = Order.create({
                //id: 003,
                status: 'cancelled'
            });

            Promise.all([promise1,promise2,promise3])
            .then(function(arr){
              orderA = arr[0];
              orderB = arr[1];
              orderC = arr[2];
            })
        })

        xit('GET all', function (done) {
            agent
            .get('/api/orders')
            .expect(200)
            .end(function (err, res) {
                if(err) return done(err);
                expect(res.body).to.be.instanceof(Array);
                expect(res.body).to.have.length(3);
                done();
            });
        });

        it('GET One', function (done) {
            agent
            .get('/api/orders/1')
            .expect(200)
            .end(function (err, res) {
                if(err) return done(err);
                expect(res.body).to.be.instanceof(Object);
                expect(res.body.status).to.equal('in cart');
                done();
            });
        });


        it('Post New Order', function (done) {
          var newOrder = {
            status: 'returned'
          };
            agent
            .post('/api/orders')
            .send(newOrder)
            .expect(204, done)
        });

        it('PUT One', function (done) {
            agent
            .put('/api/orders/1')
            .send({status: 'processing'})
            .expect(200)
            .end(function (err, res) {
                if(err) return done(err);
                expect(res.body).to.be.instanceof(Object);
                expect(res.body.status).to.equal("processing");
                done();
            });
        });

        it('DELETE One', function (done) {
            agent
            .delete('/api/orders/1')
            .expect(204)
            .end(function (err, res) {
                if(err) return done(err);
                done();
            });
        });
    });

    describe('Cart routes', function () {
      beforeEach(function () {
          var promise1 = Order.create({
                //id: 001,
                status: 'in cart'
            });

            var promise2 = Order.create({
                //id: 002,
                status: 'shipped'
            });

            var promise3 = Order.create({
                //id: 003,
                status: 'cancelled'
            });

            Promise.all([promise1,promise2,promise3])
            .then(function(arr){
              orderA = arr[0];
              orderB = arr[1];
              orderC = arr[2];
            })
        })

        xit('GET all', function (done) {
            agent
            .get('/api/orders')
            .expect(200)
            .end(function (err, res) {
                if(err) return done(err);
                expect(res.body).to.be.instanceof(Array);
                expect(res.body).to.have.length(3);
                done();
            });
        });

    });

})
