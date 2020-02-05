const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
var HashMap = require('hashmap');
const routes  = require('./src/routes/api') ;
var cors = require('cors')

const db  = require('./src/db/connection') ;

//const db = require('./db/db');


app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(cors());
app.use(routes);


//const handleRegistration = require("./src/Registration/Registration");
//const PubSub = require('pubsub-js');
//var REGISTER_MSG = 'Register';
//var START_MSG = 'Start';
var usesList = new HashMap();



app.listen(9000, function(){
    console.log("server run on port 9000")
});









