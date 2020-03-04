const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // using package to handle password encryption
const jwt = require('jsonwebtoken');

// Book schema
const bookSchema = new mongoose.Schema({
    title: {type: String},
    author: {type: String},
    pages: {type: Number},
    notes: {type: String},
});

// User schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 characters long']

    },
    number_books: { type: Number},
    currentBook: bookSchema,
    lastBook: bookSchema,
    nextBook: bookSchema,
    favorite_book: String,
    favorite_author: String,
    favorite_quote: String,
    books: [bookSchema],
    saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail');

// Generate salt secret code and encrypt password
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Method for verifying password (compare with original password)
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

userSchema.methods.generateJwt =  function () {
    return jwt.sign({_id: this._id}, 
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        });
}

// Initialize User model with mongoose
mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);

module.exports = {User, Book};
