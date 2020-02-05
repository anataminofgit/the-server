
const PubSub = require('pubsub-js');
const  {GREETING_MSG} = require  ( './messages')
const sendMessage = require  ( '../utils/sendMessage')

PubSub.subscribe(GREETING_MSG, function (msg, data) {

    var  msgData = {uuid: data.uuid,
        email: data.email,
        action : GREETING_MSG,
        isSuccess : true,
        reqRes : "Res"

        }
    if (Math.random()>0.9)
        msgData.isSuccess = false
    console.log("<<<Sending ", msgData.action," is sucess= ", msgData.isSuccess)
    sendMessage.ResponseToRequest(msgData)

});