'use strict';
var router = require('express').Router();
var Product = require('../../db/models/product');
module.exports = router;

router.get('/', function(req, res, next) {
  Product.findAll({})
  .then(function(products) {
    res.send(products);
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {
  Product.findById(req.params.id)
  .then(function(product) {
    res.send(product);
  })
  .catch(next);
});

router.get('/:tag', function (req, res, next) {
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
  Product.findById(req.params.id)
  .then(function(product) {
    return product.update(req.body)
  })
  .then(function(updatedProduct) {
    res.send(updatedProduct);
  })
  .catch(next);
});

router.delete('/:id', function(req, res, next) {
  Product.findById(req.params.id)
  .then(function(product) {
    return product.destroy();
  })
  .catch(next);
})