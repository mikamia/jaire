'use strict';
var router = require('express').Router();
var Order = require('../../../db/models/order');
var Product = require('../../../db/models/product');
var OrderProduct = require('../../../db/models/order-products');
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