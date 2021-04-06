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
            console.log(`username=${user.username}, password=${password}, entered password = ${password}`);
            if (user !== null) {
                if (user.password === password) {
                    console.log("All good - do next");
                    return next(null, user);
                } else {
                    return next(null, false);
                }
            } else {
                return next(null, false);
            }
        }));

    return {
        routes: function (app) {
            app.post('/login',
                passport.authenticate('local', { failureRedirect: '/login' }),
                function (req, res) {
                    res.redirect('/');
                });
        }
    };
};