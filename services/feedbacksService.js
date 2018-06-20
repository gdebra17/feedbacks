const db = require('./../models/index');
const operator = db.sequelize.Op;
const uuid = require('uuid-v4');

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

function dbMessageUserToFacade(dbMessageUser) {
  return {body: dbMessageUser.content, createdDate: dbMessageUser.createdAt, read: dbMessageUser.read, sender: dbUserToFacade(dbMessageUser)};
}

function dbUserToFacade(dbUser) {
  return {token: dbUser.token, name: dbUser.name, mail: dbUser.mail, type: dbUser.type, pathImage: dbUser.path_image};
}


function getFeedbackIdByToken(feedbackToken) {
  return db.feedbacks.findAll({
    where: {
      token: feedbackToken,
    },
    raw: true
  })
  .then(dbFeedbacks => {
    return dbFeedbacks[0].id;
  })
}


function getFeedbackDetailById(feedbackId) {
  console.log("services/getFeedbackDetailById:", feedbackId);
  const feedbackResult = newFeedback();
  const userIdList = [];

  return db.sequelize.query('SELECT * FROM feedbacks f left outer join products p on p.id=f.product_id WHERE f.id = :feedbackId ',
    { replacements: { feedbackId: feedbackId }, type: db.sequelize.QueryTypes.SELECT })
  .then(dbFeedbacks => {
    feedbackResult.header = dbFeedbackProductToFacade(dbFeedbacks[0]);

    userIdList.push(dbFeedbacks[0].userId);

    return db.sequelize.query('SELECT * FROM messages m inner join users u on u.id=m.user_id WHERE m.feedback_id = :feedbackId ',
      { replacements: { feedbackId: feedbackId }, type: db.sequelize.QueryTypes.SELECT })
  })
  .then(dbMessagesUser => {
    dbMessagesUser.forEach(dbMessageUser => {
      feedbackResult.messages.push(dbMessageUserToFacade(dbMessageUser));

      if (!userIdList.includes(dbMessageUser.user_id)) {
        userIdList.push(dbMessageUser.user_id);
      }
    });
    return db.users.findAll({
      where: {
        id: { [operator.or]: userIdList }
      },
      raw: true
    });
  })
  .then(dbUsers => {
    // dbUsers.forEach(dbUser => {
    //   feedbackResult.senders.push(dbUserToFacadeUser(dbUser));
    // });
    return feedbackResult;
  });
}


function createNewFeedback(username, mail, path_image_user, topic, content, decathlonid, photo) {

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
      return db.users.create({name: username, mail: mail, path_image: path_image_user, type: "CUSTOMER", token: uuid()});
    }
  })
  .then(user => {
    currentUserId = user.id;
    console.log("createNewFeedback: currentUserId=", currentUserId);
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
      console.log("createNewFeedback: currentProductId=", currentProductId);
      return db.feedbacks.create({user_id: currentUserId, product_id: currentProductId, topic: topic, token: uuid()});
    }
  })
  .then(feedback => {
    console.log("feedback=", feedback);
    currentFeedbackId = feedback.id;
    currentFeedbackToken = feedback.token;
    console.log("createNewFeedback: currentFeedbackId=", currentFeedbackId, ", currentFeedbackToken=", currentFeedbackToken);
    return db.messages.create({feedback_id: currentFeedbackId, user_id: currentUserId, content: content, read: false});
  })
  .then(message => {
    currentMessageId = message.id;
    console.log("createNewFeedback: currentMessageId=", currentMessageId);
    return currentFeedbackToken;
  })
  .catch(error => {
    console.log("createNewFeedback ERROR:", error.message);
    return {error: error.message};
  })

}

module.exports = {
  getFeedbackIdByToken: getFeedbackIdByToken,
  getFeedbackDetailById: getFeedbackDetailById,
  createNewFeedback: createNewFeedback,
}
