'use strict';
var router = require('express').Router();
var Order = require('../../../db/models/order');
var Product = require('../../../db/models/product');
var OrderProduct = require('../../../db/models/order-products');
var Promise = require("bluebird");
module.exports = router;

router.get('/', function (req, res, next) {
  Order.findAll({})
    .then(function (orders) {
      res.send(orders);
    })
    .catch(next);
});

router.get('/cart', function (req, res, next) {
  OrderProduct.findAll({
      where: {
        orderId: req.session.orderId
      }
    })
    .then(products => {
      res.send(products);
    });
})

// this route is used to give a userId to a previously logged out person's cart
// upon that person logging in
router.put('/cart', function(req, res, next) {
  Order.findById(req.session.orderId)
  .then(function(order) {
    if (!order) {
      res.sendStatus(200);
    } else {
      // see if they have an active cart already, and if they do, merge
      Order.findOne({
        where: {
          userId: req.user.id,
          status: 'in cart'
        }
      })
      .then(function (prevOrder) {
        if (!prevOrder) {
          order.update({
            userId: req.user.id
          })
          .then(function () {
            res.sendStatus(201);
          })
          .catch(next);
        } else {
          console.log('the previous order-------', prevOrder);
          OrderProduct.findAll({
            where: {
              orderId: order.id
            }
          })
          .then(function(orderProducts) {
            console.log('the order products-------', orderProducts);
            let updatePromises = orderProducts.map(function(orderProduct) {
              orderProduct.orderId = prevOrder.id;
              console.log('the prev order id is---------', prevOrder.id);
              console.log('the order product is now-------', orderProduct);
              return orderProduct.save();
            });
            console.log('the update promises--------', updatePromises);
            Promise.all(updatePromises)
            .then(function() {
              return order.destroy();
            })
            .then(function() {
              res.sendStatus(201);
            })
            .catch(next);
          });
        }
      });
    }
  });
})

router.delete('/cart', function (req, res, next) {
  req.session.orderId = null;
  res.sendStatus(205);
})

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

router.get('/:id', function (req, res, next) {
  res.json(req.order);
});

router.post('/', function (req, res, next) {
  function addToOrder(order) {
    req.session.orderId = order.id;
    order.addProduct(req.body.productId, {
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty
      })
      .then(function () {
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
      .spread(function (order) {
        addToOrder(order);
      });
  } else {
    Order.findOrCreate({
        where: {
          id: req.session.orderId
        }
      })
      .spread(function (order) {
        addToOrder(order);
      });
  }
});

router.put('/:id', function (req, res, next) {
  req.order.update(req.body)
    .then(function () {
      return Order.findById(req.params.id);
    })
    .catch(next);
})

router.delete('/:id', function (req, res, next) {
  req.order.destroy()
    .then(function () {
      res.sendStatus(204);
    })
    .catch(next);
});