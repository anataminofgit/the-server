
const ResistrationProcess = require("./RegistrationProcess");
const greeting = require('./greeting');
const giftCard = require('./giftCard');
const createAccount = require('./createAccount');

module.exports  = function handleRegistration (email, uuid) {
 
    resistrationProcess = new ResistrationProcess(email, uuid); 
    return resistrationProcess.proccessRun()

}
