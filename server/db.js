const mongoose = require('mongoose');
//'mongodb://localhost:27017/BookClub'

// Connect to mongodb database Book Club
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}, (err) => {
    if (!err)
        console.log('MongoDB connection succeeded...');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));

});

require('./models/user.model');

module.exports = mongoose;