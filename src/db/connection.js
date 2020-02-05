const mongoose = require('mongoose')
const config = require('config') ;

//console.log(config.database.properties);

mongoose.connect(config.database.url,{
                                        useNewUrlParser: true, 
                                        useUnifiedTopology: true ,
                                        useFindAndModify: false,
                                        useCreateIndex: true
                                        } )
                                     


mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error.'));
db.once('open', function callback() {
  console.log("Connection with database succeeded.");
});

exports.db = db;
