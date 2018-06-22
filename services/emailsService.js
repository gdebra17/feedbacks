const db = require('./../models/index');
const operator = db.sequelize.Op;

function replaceAllInformations(body, informations) {
  function replaceAll(str,replaceWhat,replaceTo){
      var re = new RegExp(replaceWhat, 'g');
      return str.replace(re,replaceTo);
  }
  informations.urlEmailCustomer = process.env.URL_EMAIL_CUSTOMER;

  let bodyResult = body;
  Object.keys(informations).forEach(key => {
    bodyResult = replaceAll(bodyResult, "{"+key+"}", informations[key]);
  });
  return bodyResult;
}

function sendMail(user, emailTemplateId, informationJson) {
  const information = JSON.parse(informationJson);
  //console.log("sendMail user=", user, ", emailTemplateId=", emailTemplateId, ", information=", information);

console.log("process.env.MJ_APIKEY_PUBLIC", process.env.MJ_APIKEY_PUBLIC);

  const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

  return db.email_templates.findAll({
    where: {
      id: emailTemplateId,
    },
    raw: true
  })
  .then(emailTemplates => {
    const request = mailjet
      .post("send", {'version': 'v3.1'})
      .request({
        "Messages":[
                {
              "From": {
              "Email": "julian.boes@decathlon.com",
              "Name": "Decathlon"
            },
            "To": [
              {
                "Email": user.mail,
                "Name": user.name,
              }
            ],
            "Subject": emailTemplates[0].subject,
            "TextPart": replaceAllInformations(emailTemplates[0].body, information),
            "HTMLPart": replaceAllInformations(emailTemplates[0].body, information),
          }
        ]
      })
  });
}

function createEmailTosend(codeMail, userId, information) {
  return db.email_templates.findAll({
    where: {
      code: codeMail,
    },
    raw: true
  })
  .then(emailTemplates => {
    return db.email_histories.create({email_template_id: emailTemplates[0].id, user_id: userId, information: JSON.stringify(information), status: "TO_SEND"})
    .then(email_history => {
      console.log("createEmailRequest",email_history);
    });
  });
}

function sendAllEmailToSend() {
  return db.email_histories.findAll({
    where: {
      status: "TO_SEND",
    },
    raw: true
  })
  .then(emailHistoriesToSend => {
    console.log("emailHistoriesToSend=", emailHistoriesToSend);
    emailHistoriesToSend.forEach(emailHistoryToSend => {
      return db.users.findAll({
        where: {
          id: emailHistoryToSend.user_id,
        },
        raw: true
      })
      .then(users => {
        sendMail(users[0], emailHistoryToSend.email_template_id, emailHistoryToSend.information);
      })
    })
  })
}

module.exports = {
  sendMail: sendMail,
  createEmailTosend: createEmailTosend,
  sendAllEmailToSend: sendAllEmailToSend,
}
