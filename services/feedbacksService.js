const db = require('./../models/index');
const operator = db.sequelize.Op;

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

  // return db.feedbacks.findAll({
  //   where: {
  //     id: feedbackId,
  //   },
  //   raw: true
  // })
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

module.exports = {
  getFeedbackIdByToken: getFeedbackIdByToken,
  getFeedbackDetailById: getFeedbackDetailById,
}
