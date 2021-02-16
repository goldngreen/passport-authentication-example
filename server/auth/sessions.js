module.exports = function(passport, db) {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, next) {
    next(null, user.id);
  });
  
  passport.deserializeUser(function(id, next) {
    db.users.findById(id, function (err, user) {
      if (err) { return next(err); }
      next(null, user);
    });
  });
  
  return passport;
};