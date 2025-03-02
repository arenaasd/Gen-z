const mongoose = require('mongoose');
const debug = require('debug')('development:mongoose');

// MongoDB URI should be a string, so wrap it in quotes
const mongoUri = "mongodb+srv://akgamerz397:nadanak420@cluster0.rcjgs.mongodb.net/gen-z";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        debug("Connected to MongoDB Atlas");
    })
    .catch((err) => {
        debug(err);
    });

module.exports = mongoose.connection;
