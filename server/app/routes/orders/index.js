'use strict';
var router = require('express').Router();
var Order = require('../../../db/models/order');
var Product = require('../../../db/models/product');
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
	if (req.user) {
		// this is where we handle authenticated user add to cart
		return;
	} else {
		// here we need to create a new order and add the products to it by using the setProduct method?
		Order.findOrCreate({
      where: {
        id: req.session.orderId
      }
    })
		.then(function(order) {
			req.session.orderId = order.id;
      return order;
		})
    .then(function(order) {
      return order.addProduct(req.body.productId, {
        price: req.body.price,
        qty: req.body.qty
      });
    })
    .then(function() {
      res.sendStatus(204);
    })
		.catch(next);
	}
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
