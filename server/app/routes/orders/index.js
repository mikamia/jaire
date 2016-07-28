'use strict';
var router = require('express').Router();
var Order = require('../../../db/models/order');
module.exports = router;

router.get('/', function(req, res, next) {
  Order.findAll({})
    .then(function(orders) {
      res.send(orders);
    })
    .catch(next);
});

router.param('id', function(req, res, next, id) {
  Order.findById(id)
    .then(function(order) {
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
  Order.create(req.body)
    .then(function(order) {
      res.send(order);
    })
    .catch(next);
});

router.put('/:id', function(req, res, next) {
  req.order.update(req.body)
    .then(function() {
      return Order.findById(req.params.id);
    })
    .catch(next);
})

router.delete('/:id', function(req, res, next) {
  req.order.destroy
    .then(function() {
      res.sendStatus(204);
    })
    .catch(next);
});
