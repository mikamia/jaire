'use strict';
// var crypto = require('crypto');
// var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: '[]'
  }
}, {
  classMethods: {
    findByTag: function(tag) {
      return this.findAll({
        where: {
          tags: {
            $contains: [tag]
          }
        }
      });
    }
  }
});
