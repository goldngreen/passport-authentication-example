module.exports = async function (userService) {

    var passport = require('passport');
    var local = await require('./local')(passport, userService);
    await require('./sessions')(passport, userService);

    return {
        init: function (app) {

            // Initialize Passport and restore authentication state, if any, from the
            // session.
            app.use(passport.initialize());
            app.use(passport.session());

            app.get('/login',
                function (req, res) {
                    res.render('login.html', { title: 'Login' });
                });

            // setup the routes necessary for each provider
            local.routes(app);

            // list the json of each user in the system (including passwords for local users)
            app.get('/auth/db/users', async function (req, res) {
                var users = await userService.fetch();
                res.render('auth/users.html', {
                    title: 'Users',
                    users: users.map(function (user) {
                        return JSON.stringify(user);
                    })
                });
            });

            app.get('/logout',
                function (req, res) {
                    req.logout();
                    res.redirect('/');
                });

        }
    };
};