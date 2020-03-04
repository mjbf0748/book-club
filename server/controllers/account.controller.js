const express = require('express');
const router = express.Router();
const {User, Book} = require('../models/user.model');

module.exports.createBook = (req, res, next) => {
    var book = new Book;
    book.title = req.body.title;
    book.author = req.body.author;
    book.pages = req.body.pages;

    User.findOne({email: req.body.email}, (err, user) => {
        if (!err){
            for (let user_book of user.books) {
                if (user_book.title == book.title && user_book.author == book.author) {
                    
                    console.log({message: 'Book already added'});
                    res.send({message: 'Book already added'});
                    return false;
                } 
            }
            user.books.push(book);
            user.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else
                    return next(err);
                    
            });
            
        }
        else
            console.log(err);
    });
    
    
}

module.exports.update = (req, res) => {
    let conditions = {email: req.body.email, "books.title": req.body.book.title};
    
    User.updateOne(conditions, {$set: {"books.$.notes": req.body.book.notes}})
        .then(doc => {
            if (!doc) {return res.status(404).end(); }
            return res.status(200).json(doc);
        })
        .catch(err => next(err));
};

module.exports.delete = (req, res) => {
    let conditions = {email: req.body.email};
    
    User.update(conditions, {$pull: {books: {title: req.body.title}}})
        .then(doc => {
            if (!doc) {return res.status(404).end(); }
            return res.status(200).json(doc);
        })
        .catch(err => next(err));
};



