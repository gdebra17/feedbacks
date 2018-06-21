const db = require('./../models/index');
const operator = db.sequelize.Op;
const uuid = require('uuid-v4');

const usersService = require("./usersService");

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
    console.log("dbUploadsToFacade dbUploads=", dbUploads);
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
      //console.log("createNewFeedback: currentProductId=", currentProductId);
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


module.exports = {
  getFeedbackHeaderByToken: getFeedbackHeaderByToken,
  getFeedbackDetailById: getFeedbackDetailById,
  createNewFeedback: createNewFeedback,
  addNewMessageToFeedback: addNewMessageToFeedback,
}
