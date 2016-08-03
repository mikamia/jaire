'use strict';
var router = require('express').Router();
var Order = require('../../../db/models/order');
var Product = require('../../../db/models/product');
var OrderProduct = require('../../../db/models/order-products');
var Promise = require("bluebird");
module.exports = router;

router.get('/', function(req, res, next) {
    Order.findAll({})
        .then(function(orders) {
            res.send(orders);
        })
        .catch(next);
});

router.get('/users/:userId', function (req, res, next) {
  console.log('users/:userid router');
  console.log('req.params.userid', req.params.userId);
  Order.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(function (orders) {
    console.log('ORDERS', orders);
    res.send(orders);
  })
  .catch(next);
});


router.get('/cart', function(req, res, next) {
    OrderProduct.findAll({
            where: {
                orderId: req.session.orderId
            }
        })
        .then(products => {
            res.send(products);
        });
})

router.get('/order-products/:id', function(req, res, next) {
    OrderProduct.findAll({
            where: {
                orderId: req.params.id
            }
        })
        .then(products => {
            res.send(products);
        });


// this route is used to give a userId to a previously logged out person's cart
// upon that person logging in
router.put('/cart', function(req, res, next) {
    Order.findById(req.session.orderId)
        .then(function(order) {
            // see if they have an active cart already, and if they do
            // set that as the cart on their session and delete the cart they created
            // while logged out if it exists
            Order.findOne({
                    where: {
                        userId: req.user.id,
                        status: 'in cart'
                    }
                })
                .then(function(prevOrder) {
                    if (!prevOrder) {
                        if (!order) {
                            res.sendStatus(200);
                        } else {
                            order.userId = req.user.id;
                            order.save(function() {
                                    res.sendStatus(200);
                                })
                                .catch(next);
                        }
                    } else {
                        req.session.orderId = prevOrder.id;
                        if (order && order.id !== prevOrder.id) {
                            order.destroy()
                                .then(function() {
                                    res.sendStatus(200);
                                })
                                .catch(next);
                        } else {
                            res.sendStatus(200);
                        }
                    }
                });
        });

});

router.delete('/cart', function(req, res, next) {
    req.session.orderId = null;
    res.sendStatus(205);
})

router.put('/checkout', function(req, res, next) {
    Order.findById(req.session.orderId)
        .then(function(order) {
            return order.update({
                status: 'processing'
            })
        })
        .then(function() {
            req.session.confirmedOrderId = req.session.orderId;
            req.session.orderId = null;
            res.sendStatus(201);
        })
        .catch(next);
})

router.get('/confirmed-order-id', function (req, res, next) {
    let id = req.session.confirmedOrderId;
    res.status(200).json(id);
})

router.get('/checkout', function(req, res, next) {
    Order.findById(req.session.orderId)
        .then(function(order) {
            res.status(200).send(order);
        })
        .catch(next);
})

// router.put('/:id/product/:productId', function (req, res, next){
//   Order.findOne({
//     where: {
//       orderId: req.params.id,
//       productId: req.params.productId
//     }
//   })
//   .then(function(order){
//     return order.update(req.data)
//   })
//   .then(function(res){
//     console.log("here's some res ", res)
//   })
// })

router.param('id', function (req, res, next, id) {
  Order.findById(id)
    .then(function (order) {
      if (!order) {
        throw new Error('not found!');
      }
      req.order = order;
      next();
      return null;
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {
    res.json(req.order);
});

router.post('/', function(req, res, next) {
    function addToOrder(order) {
        req.session.orderId = order.id;
        order.addProduct(req.body.productId, {
                name: req.body.name,
                price: req.body.price,
                qty: req.body.qty
            })
            .then(function() {
                res.sendStatus(204);
            })
            .catch(next);
    }

    if (req.user) {
        Order.findOrCreate({
                where: {
                    userId: req.user.id,
                    status: 'in cart'
                }
            })
            .spread(function(order) {
                addToOrder(order);
            });
    } else {
        Order.findOrCreate({
                where: {
                    id: req.session.orderId
                }
            })
            .spread(function(order) {
                addToOrder(order);
            });
    }
});

router.put('/:id', function(req, res, next) {
    req.order.update(req.body)
        .then(function() {
            return Order.findById(req.params.id)
        })
        .then(updatedOrder => {
            res.send(updatedOrder);
        })
        .catch(next);
})


router.put('/:orderId/:productId', function(req, res, next) {
    OrderProduct.findOne({
        where: {
            orderId: req.params.orderId,
            productId: req.params.productId
        }
    })
    .then(function(foundOrder){
        console.log(req.body)
        return foundOrder.update(req.body)
    })
    .then(function(){
        return OrderProduct.findOne({
            where: {
                orderId: req.params.orderId,
                productId: req.params.productId
            }
        })
    })
    .then(function(foundOrder){
        res.send(foundOrder);
    })
})



router.delete('/:id', function(req, res, next) {
    req.order.destroy()
        .then(function() {
            res.sendStatus(204);
        })
        .catch(next);
});
