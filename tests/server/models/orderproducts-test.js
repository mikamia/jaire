var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var OrderProduct = db.model('orderproduct');
var Order = db.model('order');
var Product = db.model('product');


describe('OrderProducts model', function() {
    beforeEach('Sync DB', function() {
        return db.sync({ force: true });
    });

    describe('totalPrice getterMethod', function() {

        it('should get totalPrice for each product', function() {
            var prod;
            return Product.create({
                    name: "weedAir",
                    price: 50
                })
                .then(product => {
                    prod = product.dataValues;
                    return Order.create({})
                })
                .then(order => {
                    return order.addProduct(prod.id, {
                        name: prod.name,
                        price: prod.price,
                        qty: 5
                    });
                })
                .then(function() {
                    return OrderProduct.findOne({
                        where: {
                            orderId: 1
                        }
                    });

                })
                .then(order => {
                    expect(order.totalPrice).to.equal(250);
                });


        });



    });
});
