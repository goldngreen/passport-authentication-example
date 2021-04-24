module.exports = async function (passport, userService) {

    let Strategy = require('passport-local').Strategy;
    // Configure the local strategy for use by Passport.
    //
    // The local strategy require a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `next` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(new Strategy(
        async function (username, password, next) {
            const user = await userService.findByUsername(username);
            if (user !== null) {
                if (user.password === password) {
                    return next(null, user);
                } else {
                    return next(null, false);
                }
            } else {
                return next(null, false);
            }
        }));

    return {
        routes: async function (app) {
            app.post('/ajaxlogin', function (req, res, next) {
                passport.authenticate('local', function (err, user, info) {
                    if (err) { 
                        return next(err); 
                    }
                    if (!user) { 
                        return res.end('failed to log in'); 
                    }
                    req.logIn(user, function (err) {
                        if (err) { 
                            return next(err); 
                        }
                        return res.end('logged in');
                    });
                })(req, res, next);
            });

            app.post('/login',
                passport.authenticate('local', { failureRedirect: '/login' }),
                function (req, res) {
                    res.redirect('/');
                }
            );
        }
    };
};