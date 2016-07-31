'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('orderproduct', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
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
  },
  getterMethods: {
    totalPrice: function() {
      return this.price * this.qty;
    }
  }
});
