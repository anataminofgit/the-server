const PubSub = require('pubsub-js');


var REGISTER_MSG = 'Register';
var CREATE_ACCOUNT_MSG = 'CREATE_ACCOUNT_MSG';
PubSub.subscribe(CREATE_ACCOUNT_MSG, function (msg, data) {
    var  msgData = {uuid: data.uuid,
        email: data.email,
        action : CREATE_ACCOUNT_MSG,
        isSuccess : true
        }
    if (Math.random()>0.9)
        msgData.isSuccess = false
    console.log("<<<Sending ", msgData.action," is sucess= ", msgData.isSuccess)
    PubSub.publish(REGISTER_MSG, msgData);
});

