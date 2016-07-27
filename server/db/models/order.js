'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
  date: {
    type: Sequelize.DATE ,
    defaultValue: Sequelize.NOW,
  },
  cart: {
  	type: Sequelize.ARRAY(Sequelize.INTEGER),
  	defaultValue: []
  },
  status: {
    type: Sequelize.ENUM('in cart', 'processing', 'shipped', 'cancelled', 'returned'),
    defaultValue: 'in cart', 
  }
});
