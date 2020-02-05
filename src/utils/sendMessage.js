//var HashMap = require('hashmap');
const uuidv1 = require('uuid/v1');
const PubSub = require('pubsub-js');
const  SEND_RES_MESSAGE = 'SEND_RES_MESSAGE'

let ongoingMessagesHolder = new Map();

function getResponseMessage(data){
    if (data.reqRes === "Res"){
        if(ongoingMessagesHolder.has(data.uuid)){
            let promiseResolve = ongoingMessagesHolder.get(data.uuid).promiseResolve
            ongoingMessagesHolder.delete(data.uuid);
            console.log(promiseResolve)
            promiseResolve({message: data});
        }
        else 
            console.log("error  res");
    }
    else
        console.log("error  res");
}


exports.Request = function (data) {
        var ongoingMessage= {
            uuid: uuidv1(),
            promiseResolve :null,
            messageId: data.messageId,
            data : data,
            reqRes : "Req"
    
        } 

        ongoingMessagesHolder.set(ongoingMessage.uuid, ongoingMessage);
        PubSub.publish(ongoingMessage.messageId, ongoingMessage);
        return new Promise((resolve, err)=>{
            ongoingMessage.promiseResolve = resolve;
            console.log(ongoingMessage.promiseResolve)
            })        
}


exports.ResponseToRequest = function (msgData) {
    PubSub.publish(SEND_RES_MESSAGE, msgData);

}



PubSub.subscribe(SEND_RES_MESSAGE, function (msg, data) {
    getResponseMessage(data);
});