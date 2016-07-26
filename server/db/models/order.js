'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
  products: {
    type: Sequize.ARRAY,
    defaultValue: [],
  },
  date: {
    type: Sequelize.DATE ,
    defaultValue: Sequelize.NOW,
  },
  status: {
    type: Sequelize.ENUM('in cart', 'processed', 'shipped', 'cancelled', 'returned'),
    defaultValue: 'in cart', 
  }
});
