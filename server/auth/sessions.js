module.exports = async function (passport, userService) {
    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(async function (user, next) {
        console.log(`serializeUser ${user.username} with id ${user.id}`);
        next(null, user.id);
    });

    passport.deserializeUser(async function (id, next) {
        console.log(`deserializeUser ${id}`);
        const user = await userService.findById(id);
        if (user !== null) {
            console.log(`Deserialized user=${user} with id=${id}`);
            return next(null, user);
        } else {
            console.log(`Failed to deserialized user=${user} with id=${id}`);
            return next(err);
        }
    });

    return passport;
};