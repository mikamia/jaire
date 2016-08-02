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
    //this returns a promise, can't do that because when we do res.send() it will stringify this promise making us not able to resolve it anymore because it'll just be a plain old string that looks like a promise

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
    }
  },
  getterMethods: {
    totalPrice: function() {
      var total = this.price * this.qty;
      return Math.round(total * 100) / 100;
    }
  }
});
