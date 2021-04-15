
module.exports = async function () {
    if (process.env.GLITCH_ENV !== 'true') {
        require('dotenv').config();
    }
    const root = process.env.PROJECT_ROOT;
    const UserService = require(root+'/server/services/user').UserService;
    const Database = require(root+'/server/data').Database;

    const databaseName = '.data/live.sqlite';
    const database = new Database(databaseName);

    await database.authenticate();
    await database.initSchema();
    const userService = new UserService(database);

    var express = require('express');
    var auth = await require(root+'/server/auth')(userService);

    // Create a new Express application.
    var app = express();

    // Configure view engine to render nunjucks templates.
    var nunjucks = require('nunjucks');
    nunjucks.configure('views', {
        autoescape: true,
        express: app
    });

    // Use application-level middleware for common functionality, including
    // logging, parsing, and session handling.
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
  
    auth.init(app);

    return {
        app: app,
        auth: auth,
        root: root,
        userService: userService
    }
}();