const emailsService = require("./services/emailsService");


//emailsService.createEmailTosend("WELCOME_CUSTOMER", 10001, {tokenFeedback: "TOKEN_FEEDBACK_2"});

emailsService.sendAllEmailToSend();


//const db = require("./models/index");

// db.email_histories
//   .findById(
//     2,
//     { include: [db.email_templates, db.users] }
//   ).then(order => {
//     console.log(JSON.stringify(order, null, 2));
//   });


// db.email_histories.findAll(
//   {
//     where: {
//       status: "TO_SEND",
//     },
//     include: [db.email_templates, db.users]
//   }
// ).then(emailHistoriesToSend => {
//   console.log(JSON.stringify(emailHistoriesToSend, null, 2));
//   emailHistoriesToSend.forEach(emailHistoryToSend => {
//     emailHistoryToSend.status = "SENT";
//     emailHistoryToSend.sendingdate = new Date();
//     emailHistoryToSend.save();
//   })
// });
