'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('orderproduct', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
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
        .then(function(products) {
          var sum = 0;
          products.forEach(function(product) {
            sum += product.price * product.qty;
          });
          return sum;
        })
    }
  }
  // also make a classMethod/virtal field to generate the sum price for each item (for cart view)
  // virtual field for total price per product
});
