const sendMessage = require("../utils/sendMessage");
const  {GREETING_MSG} = require  ( './messages')
const config = require('config')

const  MAX_RETRYS = 3
class RegistrationProcess {
    constructor(email ,uuid) {
      this.isGreetingSuccess = false;
      this.isGiftCardSuccess = false;      
      this.isCreatAccountSuccess= false;
      this.promniseCreateAccout = null;
      this.promniseGreeting = null;
      this.promniseGiftCard = null;
      this.uuid = uuid;
      this.email = email;
    }


    proccessRun(){
        return new Promise((resolve, reject) => {
            this.sendGreeting().then((value,err) =>{
                if (value){
                // now sending the giftcard
                    this.sendGiftCard().then((value,err)=>{
                        if (value){
                            // now sending the create account
                            this.sendCreateAccount().then((value,err)=>{ 
                                    if (value)
                                        return resolve (true);
                                    else
                                        return resolve (false);
                                    }
                            ).catch(error => {
                                console.log(error.message);
                            })
                        }
                        else
                            return resolve (false);
                        }).catch(error => {
                            console.log(error.message);
                        });            
                    }
                else
                    return resolve (false);
            }).catch(error => {
                console.log(error.message);
            })  
        })     
    } 

    async sendGreeting() {
                let isSuccess = false
                for (let i = 0; i < config.registration.maxRetries || isSuccess; i++) {
                    try {
                        let promise = this.sendRegistrationMessages(GREETING_MSG,this.uuid, this.email);
                        let retData = await promise;
                        if (retData != null && retData != undefined){
                            if (retData.message.isSuccess)
                                return true;                          
                        }
                    }catch (error){
                        console.log("not success to send mail time=", i , "error is :", error);
                    }
                }
                return false;
    }
     

    async sendGiftCard(){
        return true;

    }

    async sendCreateAccount(){
        return true;
       

    }
    
    sendRegistrationMessages (type, uuid, email ){
        var message ={ 
            messageId: type,
            email : email,
            uuid: uuid,
            reqres : "Req"
        }
        return sendMessage.Request(message) 

    }
    
}
module.exports = RegistrationProcess;
