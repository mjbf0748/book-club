const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const {User, Book} = require('../models/user.model');
const ctrlAccount = require('../controllers/account.controller');

const {Akademibokhandeln, Adlibris} = require('book-api');
const source = new Adlibris();

// // Search for books

// Create a book
router.post('/createBook', ctrlAccount.createBook);

// Update book
router.put('/update', ctrlAccount.update);

// Update book that is set to current
router.put('/updateCurrent', ctrlAccount.updateCurrent);

// Update book that is set to next
router.put('/updateNext', ctrlAccount.updateNext);

// Set current book to complete and move next to current
router.put('/complete', ctrlAccount.complete);

// Delete a book
router.put('/delete', ctrlAccount.delete);

//Delete the last book read
router.put('/deleteLast', ctrlAccount.deleteLast);

// Delete the book set to current book
router.put('/deleteCurrent', ctrlAccount.deleteCurrent);

//Delete the book set to next
router.put('/deleteNext', ctrlAccount.deleteNext);

// Search for books
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


module.exports = router;