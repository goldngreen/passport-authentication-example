module.exports = async function (passport, userService) {
    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(async function (user, next) {
        next(null, user.id);
    });

    passport.deserializeUser(async function (id, next) {
        const user = await userService.findById(id);
        if (user !== null) {
            return next(null, user);
        } else {
            return next(err);
        }
    });

    return passport;
};