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
          sum = Math.round(sum * 100) / 100;
          return sum;
        })
    },
  },
  getterMethods: {
    totalPrice: function() {
      var total = this.price * this.qty;
      return Math.round(total * 100) / 100;
    }
  }
});
