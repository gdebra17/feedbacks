const emailsService = require("./../services/emailsService");

function sendMails(request, result) {
  //console.log("handlers/sendMails");
  return emailsService.sendAllEmailToSend()
  .then((infos) => {
    result.json(infos);
  })
}

module.exports = sendMails;
