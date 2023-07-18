const express = require('express');
const router = express.Router();
const passport = require('passport');
const _ = require('lodash');

router.all('*', function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function(err, user, info) {

    // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
    if (err || !user || _.isEmpty(user)) {
      // PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
      return next(info);
    } else {
      return next();
    }
  })(req, res, next);
});

module.exports = router;