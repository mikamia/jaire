'use strict';
// var crypto = require('crypto');
// var _ = require('lodash');
var Sequelize = require('sequelize');
var Review = require('./review');

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
    defaultValue: []
  }
}, {
  getterMethods: {
  rating: function(){
    Review.findAll({
      where: {
        id: Review.product
      }
    })
    .then(function(reviews){
      if(reviews){
        var sum = 0;
        for(var x=0; x<reviews.length; x++){
          sum += reviews[x].stars;
        }
        var avg = sum/(reviews.length+1);
        return avg.toFixed(1);
      }
      else
        return null;
    })
  }
}}, 
  {
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