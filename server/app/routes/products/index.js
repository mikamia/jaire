'use strict';
var router = require('express').Router();
var Product = require('../../../db/models/product');
module.exports = router;

// Add authentication checks on routes for admins to update products
// something like: if (req.isAuthenticated()) or req.user.isAdmin
router.get('/', function(req, res, next) {
  Product.findAll({})
  .then(function(products) {
    res.send(products);
  })
  .catch(next);
});

router.param('id', function(req, res, next, id) {
  Product.findById(id)
  .then(function(product) {
    if (!product) {
      throw new Error('not found!');
    }
    req.product = product;
    next();
    return null;
  })
  .catch(next);
})

router.get('/:id', function(req, res, next) {
  res.json(req.product);
});

// Nice use of method
router.get('/filter/:tag', function (req, res, next) {
  Product.findByTag(req.params.tag)
  .then(function(products) {
    res.send(products);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  Product.create(req.body)
  .then(function(product) {
    res.send(product);
  })
  .catch(next);
});

router.put('/:id', function(req, res, next) {
  req.product.update(req.body)
  .then(function() {
    return Product.findById(req.params.id);
  })
  .then(function(updatedProduct) {
    res.send(updatedProduct);
  })
  .catch(next);
});

router.delete('/:id', function(req, res, next) {
  req.product.destroy()
  .then(function() {
    res.sendStatus(204);
  })
  .catch(next);
});
