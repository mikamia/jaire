'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('address', {
  name: {
    type: Sequelize.STRING
  },
  streetAddress: {
    type: Sequelize.STRING
  },
  streetAddress2: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.ENUM('Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia', 'American Samoa', 'Federated States of Micronesia', 'Guam', 'Marshall Islands', 'Northern Mariana Islands', 'Palau', 'Puerto Rico', 'Virgin Islands', 'Armed Forced Americas', 'Armed Forces Africa', 'Armed Forces Canada', 'Armed Forces Europe', 'Armed Forces Middle East', 'Armed Forces Pacific')
  },
  zip: {
    type: Sequelize.STRING
  },

}, {
  instanceMethods: {

  },
  classMethods: {},
  hooks: {}
});
