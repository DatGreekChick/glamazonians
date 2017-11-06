const passport = require('passport');
const router = require('express').Router();
const FacebookStrategy = require('passport-facebook');
const { User } = require('../db/models');
module.exports = router;

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.log(
    'Facebook client ID / secret not found. Skipping Facebook OAuth.'
  );
} else {
  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK
  };

  const strategy = new FacebookStrategy(
    facebookConfig,
    (token, refreshToken, profile, done) => {
      const facebookId = profile.id;
      const name = profile.displayName;

      User.find({ where: { facebookId } })
        .then(
          foundUser =>
            (foundUser
              ? done(null, foundUser)
              : User.create({ name, facebookId }).then(createdUser =>
                  done(null, createdUser)
                ))
        )
        .catch(done);
    }
  );

  passport.use(strategy);

  router.get('/', passport.authenticate('facebook', { scope: 'email' }));

  router.get(
    '/verify',
    passport.authenticate('facebook', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  );
}
