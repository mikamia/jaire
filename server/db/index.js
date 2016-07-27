'use strict';
var db = require('./_db');


var User = require('./models/user');
var Address = require('./models/address');
var Order = require('./models/order');
var Review = require('./models/review');
var Product = require('./models/product');

//order has one user
Order.belongsTo(User);

Address.hasMany(Order);
Address.hasMany(User);

//user has many orders
User.hasMany(Order, {as: 'orders'});
User.hasMany(Review);

//product has many reviews
Product.hasMany(Review, {as: 'reviews'});

module.exports = db;