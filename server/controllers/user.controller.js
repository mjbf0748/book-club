const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const {User, Book} = require('../models/user.model');

// Method for registering a user
module.exports.register = (req, res, next) => {

    // create new user and set appropriate fields
    var user = new User;
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    
    
    // Call save to confirm user insert
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else
            {
                if (err.code == 11000)
                    res.status(422).send(['Duplicate email address found']);
                else 
                    return next(err);
            }
    });
}

// Method for authenticaing a user at sign in
module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return req.status(400).json(err);

        else if (user) return res.status(200).json({"token": user.generateJwt()});

        else return res.status(404).json(info);
    })(req, res);
}

// Method to fetch user and user details
module.exports.userProfile = (req, res, next) => {
    User.findOne({_id: req._id}, 
        (err, user) => {
            if (!user)
                return res.status(400).json({status: false, message: 'User record not found'});
            else
                return res.status(200).json({status: true, user: _.pick(user, ['fullName', 'email', 'books', 'currentBook', 'lastBook', 'nextBook'])});
        });
}