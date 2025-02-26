const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('development:mongoose')

mongoose.connect(`${config.get("MONGODB_URI")}/gen-z`).then(function(){
    debug("connected to db");
}).catch(function(err){
    debug(err);
});


module.exports = mongoose.connection;
