
var User;

// default user list
var users = [
    { username: "johnh", password: "johnh", firstName: "John", lastName: "Hancock", email: "johnh@example.com", validated: true },
    { username: "lizs", password: "lizs", firstName: "Liz", lastName: "Smith", email: "lizs@example.com", validated: true },
    { username: "ahmedk", password: "ahmedk", firstName: "Ahmed", lastName: "Khan", email: "ahmedk@example.com", validated: true }
  ];

var Sequelize = require('sequelize');

// setup a new database
// using database credentials set in .env
var sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
    host: '0.0.0.0',
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
      // Security note: the database is saved to the file `live.sqlite` on the local filesystem. It's deliberately placed in the `.data` directory
      // which doesn't get copied if someone remixes the project.
    storage: '.data/live.sqlite'
  });
  
  // authenticate with the database
  sequelize.authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
      // define a new table 'users'
      User = sequelize.define('users', {
        username: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        validated : { type: Sequelize.BOOLEAN }
      });
      
      setup();
    })
    .catch(function (err) {
      console.log('Unable to connect to the database: ', err);
    });
  
  // populate table with default users
  function setup(){
    User.sync({force: true}) 
      .then(function(){
        // Add the default users to the database
        for(var i=0; i<users.length; i++){ // loop through all users
          User.create(users[i]); // create a new entry in the users table
        }
      });  
  }
  
  exports.User=User;
