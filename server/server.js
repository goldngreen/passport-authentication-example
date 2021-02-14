if (process.env.GLITCH_ENV !== 'true') {
    require('dotenv').config();
}

var express = require('express');
var db = require('./db');
var auth = require('./auth')(db);
var sequelize = require('./sequelize');

// Create a new Express application.
var app = express();

// Configure view engine to render nunjucks templates.
var nunjucks = require('nunjucks');
nunjucks.configure('server/views', {
    autoescape: true,
    express: app
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handlin
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

auth.init(app);

// Define routes.
app.get('/',
  function(req, res) {
    res.render('index.html', { title: 'Welcome', user: req.user });
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile.html', { title: 'Profile', user: req.user });
  });

require('../default-handlers')(app);

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});