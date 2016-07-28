'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('orderproduct', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {
  classMethods: {
    getSum: function(orderId) {
      this.findAll({
        where: {
          orderId: orderId
        }
      })
        .then(function(orders) {
          var sum = 0;
          orders.forEach(function(order) {
            sum += order.price;
          });
          return sum;
        })
    }
  }
});
