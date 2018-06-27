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
      //console.log("createEmailRequest",email_history);
      return email_history;
    });
  });
}


function sendMail(emailToSend) {
  //console.log("sendMail emailToSend=", JSON.stringify(emailToSend, null, 2));
  //console.log("process.env.MJ_APIKEY_PUBLIC", process.env.MJ_APIKEY_PUBLIC);
  const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

  return mailjet
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
              "Email": emailToSend.user.mail,
              "Name": emailToSend.user.name,
            }
          ],
          "Subject": emailToSend.email_template.subject,
          "TextPart": replaceAllInformations(emailToSend.email_template.body, JSON.parse(emailToSend.information)),
          "HTMLPart": replaceAllInformations(emailToSend.email_template.body, JSON.parse(emailToSend.information)),
        }
      ]
    }).then(res => {
      //console.log("mailjet res = ", JSON.stringify(res, null, 2));
      //console.log("response.status=", res.response.status);
      if (res.response.status === 200) {
        return true;
      }
      return false;
    })

}

function sendAllEmailToSend() {
  return db.email_histories.findAll(
    {
      where: {
        status: "TO_SEND",
      },
      include: [db.email_templates, db.users]
    }
  ).then(emailHistoriesToSend => {
    // console.log("emailHistoriesToSend.length=", emailHistoriesToSend.length);
    emailHistoriesToSend.forEach(emailHistoryToSend => {
      sendMail(emailHistoryToSend).then(result => {
        if (result) {
          emailHistoryToSend.status = "SENT";
          emailHistoryToSend.sendingdate = new Date();
          emailHistoryToSend.save();
        } else {
          emailHistoryToSend.status = "ERROR";
          emailHistoryToSend.sendingdate = new Date();
          emailHistoryToSend.save();
        }
      });
    });
    return emailHistoriesToSend.length;
  });
}

module.exports = {
  createEmailTosend: createEmailTosend,
  sendAllEmailToSend: sendAllEmailToSend,
}
