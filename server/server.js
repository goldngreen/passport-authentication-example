
if (process.env.GLITCH_ENV !== 'true') {
    require('dotenv').config();
}

(async function () {
    const UserService = require(process.env.PROJECT_ROOT+'/server/services/user').UserService;
    const Database = require(process.env.PROJECT_ROOT+'/server/data').Database;

    const databaseName = '.data/live.sqlite';
    const database = new Database(databaseName);

    await database.authenticate();
    await database.initSchema();
    const userService = new UserService(database);

    const jack = await userService.create({
        username: "jack",
        password: process.env.PASS1,
        displayName: "Jack Skellington",
        firstName: "Jack",
        lastName: "Skellington",
        email: "jack@example.com",
        validated: true,
        created: new Date().getTime(),
        provider: "local"
    });

    const jill = await userService.create({
        username: "jill",
        password: process.env.PASS2,
        displayName: "Jill Scott",
        firstName: "Jill",
        lastName: "Scott",
        email: "jill@example.com",
        validated: true,
        created: new Date().getTime(),
        provider: "local"
    });

    var express = require('express');
    var auth = await require(process.env.PROJECT_ROOT+'/server/auth')(userService);

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
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
  
    auth.init(app);

    // Define routes.
    app.get('/',
        function (req, res) {
            console.log(`Session Id is: ${req.session.id}`);
            console.log(`req.session.testafs=${req.session.testafs}`);
            console.log(`index.html - user=${req.user}`);
            res.render('index.html', { title: 'Welcome', user: req.user });
        });

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('profile.html', { title: 'Profile', user: req.user });
        });

    require(process.env.PROJECT_ROOT+'/server/default-handlers')(app);

    var listener = app.listen(process.env.PORT, function () {
        console.log('Your app is listening on port ' + listener.address().port);
    });
})();