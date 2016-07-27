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
    .then(function(updatedReview) {
      res.send(updatedReview);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  req.review.destroy()
    .catch(next);
});
