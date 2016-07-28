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
    },
    // the include must have the alias if it is used in the relationship definition
    // as: 'reviews' for example
    // but I took out the alias in the definition because it was redundant
    defaultScope: {
        include: [{
            model: db.model('review'),
        }]
    }
});
