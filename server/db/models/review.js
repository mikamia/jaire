'use strict';
var Sequelize = require('sequelize');


var db = require('../_db');

module.exports = db.define('review', {
    stars: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { 
        min: 1,
        max: 5
      }
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    date:{
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  }
);
