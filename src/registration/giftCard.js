const PubSub = require('pubsub-js');


var REGISTER_MSG = 'Register';
var GIFT_CARD_MSG = 'GiftCard';
PubSub.subscribe(GIFT_CARD_MSG, function (msg, data) {
    var  msgData = {uuid: data.uuid,
        email: data.email,
        action : GIFT_CARD_MSG,
        isSuccess : true
        }
    if (Math.random()>0.9)
        msgData.isSuccess = false
    console.log("<<<Sending ", msgData.action," is sucess= ", msgData.isSuccess)
    PubSub.publish(REGISTER_MSG, msgData);
});

