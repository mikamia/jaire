'use strict';
var router = require('express').Router();
var User = require('../../../db/models/user');
module.exports = router;
var _ = require('lodash');

router.get('/', function(req,res,next){
  User.findAll()
  .then(function(users){
    res.json(users);
  });
})

router.get('/:id', function(req,res,next){
  User.findById(req.params.id)
  .then(function(user){
    res.send(user);
  });
})

router.post('/', function(req, res, next) {
  User.create(req.body)
    .then(function(user) {
      res.status(201).json(user);
    })
    .catch(next);
  // Do we want catch next or next()??
});

router.put('/:id', function(req, res, next) {
  User.findById(req.params.id)
  .then(function(user) {
    return user.update(req.body)
  })
  .then(function() {
    return User.findById(req.params.id)
  })
  .then(function(updatedUser) {
    res.send(updatedUser);
  })
  .catch(next);
});

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

router.get('/secret-stash', ensureAuthenticated, function(req, res) {

  var theStash = [
    'http://ep.yimg.com/ay/candy-crate/bulk-candy-store-2.gif',
    'http://www.dailybunny.com/.a/6a00d8341bfd0953ef0148c793026c970c-pi',
    'http://images.boomsbeat.com/data/images/full/44019/puppy-wink_1-jpg.jpg',
    'http://p-fst1.pixstatic.com/51071384dbd0cb50dc00616b._w.540_h.610_s.fit_.jpg',
    'http://childcarecenter.us/static/images/providers/2/89732/logo-sunshine.png',
    'http://www.allgraphics123.com/ag/01/10683/10683.jpg',
    'http://img.pandawhale.com/post-23576-aflac-dancing-duck-pigeons-vic-RU0j.gif',
    'http://www.eveningnews24.co.uk/polopoly_fs/1.1960527.1362056030!/image/1301571176.jpg_gen/derivatives/landscape_630/1301571176.jpg',
    'http://media.giphy.com/media/vCKC987OpQAco/giphy.gif',
    'https://my.vetmatrixbase.com/clients/12679/images/cats-animals-grass-kittens--800x960.jpg',
    'http://www.dailymobile.net/wp-content/uploads/2014/10/lollipops.jpg'
  ];

  res.send(_.shuffle(theStash));

});
