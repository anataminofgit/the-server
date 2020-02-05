
const uuidv1 = require('uuid/v1');
const response = require('../utils/response')
//const HashMap = require('hashmap');
const checkValid = require('../utils/validations')
const User = require('../models/user')
const bcrypt  = require ('bcrypt');


const handleRegistration = require("../registration/Registration");



exports.create = function(req, res) {
    //to do work of post/create
    var  msgData = {    
                        uuid: uuidv1(),
                        success : false,
                        reason : "",
                        email: req.body.email,
                        password : req.body.password,
                        role :  "admin",
                        }
    console.log("POST /users/ req:",req.body.email,msgData.uuid);
      
    let validationCheck = (msgData.email!=undefined &&
         msgData.email.length >0 && msgData.email.length < 30) && 
                checkValid.email(msgData.email) &&
                        msgData.password!=undefined &&
                        (msgData.password.length>6 && msgData.password.length<30) ;

    if (validationCheck === false){
        return response.sendBadRequest(res, "input parameters error");
    }

    const newUser = new User(req.body);

    bcrypt.hash(msgData.password, 10, function(err, hash) {
        if (err) return next(err);   
        newUser.password = hash;
    
    
    
    newUser.save(function(err, user) {
        if (err) {
            return response.sendBadRequest(res ,err.errmsg)
            }
        console.log("handleRegistration");
        handleRegistration(msgData.email,msgData.uuid).then((resolve, err)=>{
            if (resolve){ 
                msgData = {...msgData,
                            success: true,
                            password: ""
                            }

                return response.sendCreated(res, msgData)
            }
            else{
                //remove fro DB
                User.findOne({ email: req.body.email })
                    .exec(function(err, user) {
                    if (err) throw err
                    if (user) {
                        User.deleteOne({ email: req.body.email }, function(err, item) {
                            if (err) 
                                console.log("error ? try to rollback the eail",req.body.email );        
                        })
                    }
                })
                console.log ("error handleRegistration");
                return response.sendInternalError(res, "error handleRegistration")
            }       
        })

})
}) 
}
