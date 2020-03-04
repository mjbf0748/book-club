const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const {User, Book} = require('../models/user.model');
const ctrlAccount = require('../controllers/account.controller');

const {Akademibokhandeln, Adlibris} = require('book-api');
const source = new Adlibris();

// // Search for books


router.post('/createBook', ctrlAccount.createBook);

router.put('/update', ctrlAccount.update);

router.put('/delete', ctrlAccount.delete);

router.get('/search/:title', (req, res) => {
    let bookArray = [];
    source.search(req.params.title)
        .then(books => {
            books.forEach((book) => {
                book = {
                    title: book.title,
                    author: book.authors[0],
                    cover: book.cover.url,
                    description: book.description,
                    pages: book.pages
                }
                bookArray.push(book);
            });
            res.send(bookArray);
            source.fetch(books[0]).then(book => {
            
            console.log(books.length)
            //console.log(JSON.stringify(book, null, 2));
        });
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`)
    
    User.findById(req.params.id, (err, doc) => {
        if (!err) {res.send(doc);}
        else { console.log('Error in Retrieving Book :' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`)
    
    var book = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages
    }

    Book.findByIdAndUpdate(req.params.id, {$set: book}, {new: true}, (err, doc) => {
        if (!err) {res.send(doc);}
        else { console.log('Error in Retrieving Book :' + JSON.stringify(err, undefined, 2));}
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`)
    


    Book.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {res.send(doc);}
        else { console.log('Error in Retrieving Book :' + JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;