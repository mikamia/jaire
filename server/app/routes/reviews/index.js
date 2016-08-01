'use strict';
var router = require('express').Router();
var Review = require('../../../db/models/review');
module.exports = router;

router.get('/', function(req, res, next) {
  Review.findAll({})
    .then(function(reviews) {
      res.send(reviews);
    })
    .catch(next);
});

// Nice use of param!
router.param('id', function(req, res, next, id) {
  Review.findById(id)
    .then(function(review) {
      if (!review) {
        throw new Error('not found!');
      }
      req.review = review;
      next();
      return null;
    })
    .catch(next);
});

router.get('/:id', function(req, res) {
  res.json(req.review);
});

router.post('/', function(req, res, next) {
  Review.create(req.body)
    .then(function(review) {
      res.send(review);
    })
    .catch(next);
});

router.put('/:id', function(req, res, next) {
  req.review.update(req.body)
    .then(function() {
      return Review.findById(req.params.id);
    })
    .then(function() {
      res.send('updated!');
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  req.review.destroy()
    .then(function() {
      res.sendStatus(204)
    }).catch(next);
});
