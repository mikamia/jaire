'use strict';
var db = require('./_db');


var User = require('./models/user');
var Address = require('./models/address');
var Order = require('./models/order');
var Review = require('./models/review');
var Product = require('./models/product');

//order has many products
Order.hasMany(Product, {as: 'products'});
//order has one user
Order.belongsTo(User);
//order has one address
Order.hasOne(Address);

//user has many orders
User.hasMany(Order, {as: 'orders'});
//user has many addresses
User.hasMany(Address);
//user has many reviews
User.hasMany(Review);

//product has many reviews
Product.hasMany(Review, {as: 'reviews'});
//product rating is a function based on reviews' star field

module.exports = db;