//Configuring passport using local strategy
const passport = require('passport');
const localStrategy = require('passport-local');
const mongoose = require('mongoose');
require('../models/user.model');
const User = mongoose.model('User');

// Verify user on login attempt
passport.use(
    new localStrategy({usernameField: 'email'}, (username, password, done) => {
        User.findOne({email: username}, (err, user) => {
            if (err)
                return done(err);
            else if (!user)
                return done(null, false, {message: 'Email is not registered'});
            else if (!user.verifyPassword(password))
                return done(null, false, {mesage: 'Wrong password'});
            else
                return done(null, user);
        });
    })
);
