const emailsService = require("./services/emailsService");

//emailsService.sendMail(null, null, null);

//emailsService.createEmailTosend("WELCOME_CUSTOMER", 10001, {tokenFeedback: "TOKEN_FEEDBACK_2"});

emailsService.sendAllEmailToSend();

// function replaceAll(str,replaceWhat,replaceTo){
//     var re = new RegExp(replaceWhat, 'g');
//     return str.replace(re,replaceTo);
// }

// const informations = {tokenFeedback: "TOKEN_FEEDBACK_2", info2: "info 2"};
// let body = "bonjour. le lien vers {tokenFeedback}."
// console.log("body=", body);
// console.log("informations=", informations);
//
// Object.keys(informations).forEach(key => {
//   console.log(key, informations[key]);
//   body = replaceAll(body, "{"+key+"}", informations[key]);
//
//   console.log("body=", body);
// });
