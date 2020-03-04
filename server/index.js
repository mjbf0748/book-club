require('./config/config'); // execute environment configuration 
require('./config/passportConfig');
const express = require('express'); // using package
const bodyParser = require('body-parser'); // using package to send json data
const cors = require('cors'); // using package to communicate between appropriate ports
const passport = require('passport'); // using package for authentication midddleware

const {mongoose} = require('./db.js'); // retrieve mongoose  property
const rtsIndex = require('./routes/index.router');
const rtsAccount = require('./routes/account.router');


const app = express();

// Configure middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/auth', rtsIndex);
app.use('/books', rtsAccount);

// global error handler
app.use((err, req, res, next) => {
    if (err.name == 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});


// Start server on port 3000 in development
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}...`));