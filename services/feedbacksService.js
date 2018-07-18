const db = require('./../models/index');
const operator = db.sequelize.Op;
const uuid = require('uuid-v4');

const usersService = require("./usersService");
const emailsService = require("./emailsService");

function newFeedback() {
  const newFeedback = {
    header : {},
    messages : [],
    //senders : [],
  }
  return newFeedback;
}

function dbFeedbackProductToFacade(dbFeedbackUser) {
  return {token: dbFeedbackUser.token, topic: dbFeedbackUser.topic, product: dbProductToFacade(dbFeedbackUser)};
}

function dbProductToFacade(dbProduct) {
  return {name: dbProduct.name, decathlonid: dbProduct.decathlonid, url: dbProduct.url, expiringdate: dbProduct.expiringdate};
}

function dbMessageUserToFacade(dbMessageUser, dbUploads) {
  return {body: dbMessageUser.content, createdDate: dbMessageUser.createdAt, read: dbMessageUser.read, sender: dbUserToFacade(dbMessageUser), uploads: dbUploadsToFacade(dbUploads)};
}

function dbUserToFacade(dbUser) {
  return {token: dbUser.token, name: dbUser.name, mail: dbUser.mail, type: dbUser.type, pathImage: dbUser.path_image};
}

function dbUploadsToFacade(dbUploads) {
  if (dbUploads) {
    // console.log("dbUploadsToFacade dbUploads=", dbUploads);
    return dbUploads.map(dbUpload => {
      return {pathUpload : dbUpload.path_upload, createdDate: dbUpload.createdAt}
    });
  } else {
    return [];
  }
}

function getFeedbackHeaderByToken(feedbackToken) {
  return db.feedbacks.findAll({
    where: {
      token: feedbackToken,
    },
    raw: true
  })
  .then(dbFeedbacks => {
    return dbFeedbacks[0];
  })
}


function getFeedbackDetailById(feedbackId) {
  //console.log("services/getFeedbackDetailById:", feedbackId);
  const feedbackResult = newFeedback();

  return db.sequelize.query('SELECT * FROM feedbacks f left outer join products p on p.id=f.product_id WHERE f.id = :feedbackId ',
    { replacements: { feedbackId: feedbackId }, type: db.sequelize.QueryTypes.SELECT })
  .then(dbFeedbacks => {
    feedbackResult.header = dbFeedbackProductToFacade(dbFeedbacks[0]);

    return db.sequelize.query('SELECT m.id as message_id, * FROM messages m inner join users u on u.id=m.user_id WHERE m.feedback_id = :feedbackId ',
      { replacements: { feedbackId: feedbackId }, type: db.sequelize.QueryTypes.SELECT })
  })
  .then(dbMessagesUser => {
    return Promise.all(
      dbMessagesUser.map(dbMessageUser => {
        return db.uploads.findAll({
          where: {
            message_id: dbMessageUser.message_id,
          },
          raw: true
        })
        .then(dbUploads => {
          return dbMessageUserToFacade(dbMessageUser, dbUploads);
        })
      })
    )
    .then(values => {
      feedbackResult.messages = values;
      return feedbackResult
    });
  })
}


function createNewFeedback(username, mail, pathImageUser, topic, content, decathlonid, pathPhoto) {

  let currentUserId = null;
  let currentProductId = null;
  let currentProductName = null;
  let currentProductUserId = null;
  let currentFeedbackId = null;
  let currentFeedbackToken = null;
  let currentMessageId = null;

  return db.users.findAll({
    where: {
      mail: mail,
    },
    raw: true
  })
  .then(users => {
    if (users.length > 1) {
      throw new Error(`too many users with mail ${mail}`);
    } else if (users.length === 1) {
      //console.log("createNewFeedback: user already existing");
      return users[0];
    } else {
      //console.log("createNewFeedback: create new users");
      return usersService.createNewCustomerUser(username, mail, pathImageUser);
    }
  })
  .then(user => {
    currentUserId = user.id;
    //console.log("createNewFeedback: currentUserId=", currentUserId);
    return db.products.findAll({
      where: {
        decathlonid: decathlonid,
      },
      raw: true
    })
  })
  .then(products => {
    if (products.length !== 1) {
      throw new Error(`problem with product decathlonid ${decathlonid}`);
    } else {
      currentProductId = products[0].id;
      currentProductUserId = products[0].user_id;
      currentProductName = products[0].name;
      //console.log("createNewFeedback: currentProductId=", currentProductId, ", currentProductUserId=", currentProductUserId);
      return db.feedbacks.create({user_id: currentUserId, product_id: currentProductId, topic: topic, token: uuid()})
    }
  })
  .then(feedback => {
    //console.log("feedback=", feedback);
    currentFeedbackId = feedback.id;
    currentFeedbackToken = feedback.token;
    //console.log("createNewFeedback: currentFeedbackId=", currentFeedbackId, ", currentFeedbackToken=", currentFeedbackToken);
    return addNewMessageToFeedback(currentFeedbackId, content, currentUserId);
  })
  .then(message => {
    currentMessageId = message.id;
    //console.log("createNewFeedback: currentMessageId=", currentMessageId);
    if (pathPhoto) {
      return db.uploads.create({message_id: currentMessageId, path_upload: pathPhoto})
      .then(upload => {
        currentUploadId = upload.id;
        //console.log("createNewFeedback: currentUploadId=", currentUploadId);
        return currentFeedbackToken;
      })
    } else {
      return currentFeedbackToken;
    }
  })
  .then(currentFeedbackToken => {
    return emailsService.createEmailTosend("WELCOME_CUSTOMER", currentUserId, {tokenFeedback: currentFeedbackToken, customerName: username, productDescription: currentProductName, ipName: ""})
    .then(data => {
      return currentFeedbackToken;
    });
  })
  .then(currentFeedbackToken => {
    return emailsService.createEmailTosend("IP_NEW_FEEDBACK", currentProductUserId, {tokenFeedback: currentFeedbackToken, decathlonid: decathlonid})
    .then(data => {
      return currentFeedbackToken;
    });
  })
  .then(currentFeedbackToken => {
    return emailsService.sendAllEmailToSend()
    .then(data => {
      return currentFeedbackToken;
    });
  })
  .catch(error => {
    //console.log("createNewFeedback ERROR:", error.message);
    return {errorMessage: error.message};
  })
}

function addNewMessageToFeedback(feebackId, messageContent, userId) {
  return db.messages.create({feedback_id: feebackId, user_id: userId, content: messageContent, read: false})
  .then(message => {
    //console.log("addNewMessageToFeedback: newMessage Id=", message.id);
    return message;
  })
  .catch(error => {
    //console.log("addNewMessageToFeedback ERROR:", error.message);
    return {errorMessage: error.message};
  })
}

function getFeedbackList(decathlonid="ALL") {
  let sql = "SELECT f.token, f.product_id, p.decathlonid, f.topic, u.name, m.content"
  + " FROM feedbacks f"
  + " inner join products p on p.id=f.product_id"
  + " inner join users u on u.id=f.user_id"
  + " inner join (select  feedback_id, min(id) id from messages group by feedback_id) m1 on m1.feedback_id=f.id"
  + " inner join messages m on m.id=m1.id";
  if (decathlonid !== "ALL") {
    sql += " where p.decathlonid = :decathlonid";
  }

  return db.sequelize.query(sql,
    { replacements: { decathlonid: decathlonid }, type: db.sequelize.QueryTypes.SELECT })
}

function getMessageList(urlToken) {
  // console.log("getMessageList", db.sequelize.query(`SELECT m.user_id, m.content, m.read FROM messages m on m.feedback_id=${urlToken}`,
    // { type: db.sequelize.QueryTypes.SELECT }));
  return db.sequelize.query(`SELECT m.user_id, m.content, m.read FROM message m on m.feedback_id=${urlToken}`,
    { type: db.sequelize.QueryTypes.SELECT })
}

function getAllMessage() {
  return db.sequelize.query(`SELECT f.token, f.product_id, m.feedback_id, m.user_id, m.content, m.read FROM messages m inner join feedbacks f on f.id=m.feedback_id`,
    { type: db.sequelize.QueryTypes.SELECT })
}

module.exports = {
  getFeedbackHeaderByToken: getFeedbackHeaderByToken,
  getFeedbackDetailById: getFeedbackDetailById,
  createNewFeedback: createNewFeedback,
  addNewMessageToFeedback: addNewMessageToFeedback,
  getFeedbackList: getFeedbackList,
  getMessageList: getMessageList,
  getAllMessage: getAllMessage
}
