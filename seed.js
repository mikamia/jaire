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
var Product = db.model('product');
var Review = db.model('review');
var Address = db.model('address');
var Order = db.model('order');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            name: 'grace hopper',
            isAdmin: true,
            addressId: 1,
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            name: 'Barak Obama',
            isAuthenticated: true,
            addressId: 2,
        },
        {
            email: 'katie@buechs.com',
            password: '1234',
            name: 'Katherine Buechner',
            addressId: 3,
        },
        {
            email: 'grace@gh.com',
            password: 'hopper',
            name: 'Grace Hopper',
            isAdmin: true,
            isAuthenticated: true,
            addressId: 4
        },
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedProducts = function(){
    var products = [
    {
        name: 'Brooklyn Bridge',
        description: 'A hint of salt with undertones of fresh bike tire and a tang of sweat',
        price: '100.00',
        imageUrl: 'http://icons.iconarchive.com/icons/icons8/windows-8/512/Astrology-Air-Element-icon.png',
        tags: ["Brooklyn", "Water", "Urban" ]

    }, {
        name: 'Prospect Park',
        description: 'Notes of PBR and small-brimmed hats.',
        price: '20.00',
        imageUrl: 'http://icons.iconarchive.com/icons/icons8/ios7/256/Astrology-Water-Element-icon.png',
        tags: ["Brooklyn", "Artisan", "Premium"],
    }, {
        name: 'Staten Island Ferry',
        description: 'Smells like fish and desperation.',
        price: '67.99',
        imageUrl: '',
        tags: ["Premium", "Urban", "Water"],
    }

    ];

    var creatingProducts = products.map(function(productObj){
        return Product.create(productObj);
    });

    return Promise.all(creatingProducts)
}
var seedReviews = function(){
    var reviews = [
    {  
        stars: 4,
        title: 'de Finibus Bonorum et Malorum',
        text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
        userId: 1,
        productId: 1,
    }, {
        stars: 4,
        title: 'Lorem Ipsum passage',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        userId: 2,
        productId: 1,       
    }, {
        stars: 3,
        title: '1914 translation',
        text: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.',
        userId: 3,
        productId: 1,       
    }, {
        stars: 3,
        title: 'de Finibus Bonorum et Malorum',
        text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
        userId: 1,
        productId: 2,       
    }, {
        stars: 2,
        title: 'de Finibus Bonorum et Malorum',
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
        userId: 2,
        productId: 2,       
    }, {
        stars: 1,
        title: 'H. Rackham',
        text: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.',
        userId: 3,
        productId: 2,       
    }, {
        stars: 4,
        title: 'fckin hipster bullshit...',
        text: 'to live is to suffer',
        userId: 1,
        productId: 3,       
    }, {
        stars: 1,
        title: 'it is the only thing that matters',
        text: 'gaze not into the abyss',
        userId: 1,
        productId: 3,       
    },
    ];

    var creatingReviews = reviews.map(function(reviewObj){
        return Review.create(reviewObj);
    });

    return Promise.all(creatingReviews)
}

var seedAddresses = function(){
    var addresses = [
    {
        streetAddress: '7951 Essex Drive',
        city: 'Saint Charles',
        state: 'Illinois',
        zip: '60174'      
    }, {
        streetAddress: '8513 South Chapel Lane',
        city: 'Elizabethton',
        state: 'Tennessee',
        zip: '37643'      
    }, {
        streetAddress: '734 Lilac St.',
        city: 'Vista',
        state: 'California',
        zip: '92083'
    },{
        streetAddress: '15 N. Charles Avenue',
        city: 'Oak Lawn',
        state: 'Illinois',
        zip: '60453'
    },{
        streetAddress: '884 Gulf St.',
        city:'Braintree',
        state: 'Massachusetts',
        zip: '02184' 
}];

    var creatingAddresses = addresses.map(function(addressObj){
        return Address.create(addressObj);
    });

    return Promise.all(creatingAddresses)
}

var seedOrders = function(){
    var orders = [
    {
        status: 'in cart',
        userId: 1,
        addressId: 1,
        // products: [1, 3, 2]
    },
    {
        status: 'shipped',
        userId: 1,
        addressId: 2,
        // products: [1, 3, 2]
    },
    {
        status: 'processing',
        userId: 1,
        addressId: 2,
        // products: [1, 3, 2]
    },
    {
        status: 'cancelled',
        userId: 1,
        addressId: 1,
        // products: [1, 3, 2]
    }];

    var creatingOrders = orders.map(function(orderObj){
        return Order.create(orderObj);
    });

    return Promise.all(creatingOrders)
}


// var seedReviews = function(){
//     var reviews = [
//     {
        
//     }, {
        
//     }, {
        
//     }];

//     var creatingReviews = reviews.map(function(reviewObj){
//         return Review.create(reviewObj);
//     });

//     return Promise.all(creatingReviews)
// }
// var seedReviews = function(){
//     var reviews = [
//     {
        
//     }, {
        
//     }, {
        
//     }];

//     var creatingReviews = reviews.map(function(reviewObj){
//         return Review.create(reviewObj);
//     });

//     return Promise.all(creatingReviews)
// }
// var seedReviews = function(){
//     var reviews = [
//     {
        
//     }, {
        
//     }, {
        
//     }];

//     var creatingReviews = reviews.map(function(reviewObj){
//         return Review.create(reviewObj);
//     });

//     return Promise.all(creatingReviews)
// }
db.sync({ force: true })
    .then(function(){
        return seedAddresses();
    })
    .then(function () {
        return seedUsers();
    })
    .then(function(){
        return seedProducts();
    })
    .then(function(){
        return seedReviews();
    })
    .then(function(){
        return seedOrders();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
