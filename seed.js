/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product')
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedProducts = function(){
    var products = [
    {
        title: 'Brooklyn Bridge',
        description: 'A hint of salt with undertones of fresh bike tire and a tang of sweat',
        price: '100.00',
        image: 'http://icons.iconarchive.com/icons/icons8/windows-8/512/Astrology-Air-Element-icon.png',
        tags: '["Brooklyn", "Water", "Urban" ]'

    }, {
        title: '',
        description: '',
        price: '20.00',
        image: 'http://icons.iconarchive.com/icons/icons8/ios7/256/Astrology-Water-Element-icon.png',
        tags:'["", "", ""]',
    }, {
        title: '',
        description: '',
        price: '67.99',
        image: '',
        tags: '["", "", ""]'
    }

    ];

    var creatingProducts = products.map(function(productObj){
        return Product.create(productObj);
    });

    return Promise.all(creatingProducts)
}

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function(){
        return seedProducts();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
