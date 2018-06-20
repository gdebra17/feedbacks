const db = require('./../models/index');
const operator = db.sequelize.Op;

function newFeedback() {
  const newFeedback = {
    header : {},
    messages : [],
    senders : [],
  }
  return newFeedback;
}

function dbUserToFacadeUser(dbUser) {
  return {name: dbUser.name, mail: dbUser.mail}
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

  return db.feedbacks.findAll({
    where: {
      id: feedbackId,
    },
    raw: true
  })
  .then(dbFeedbacks => {
    feedbackResult.header.token = dbFeedbacks[0].token;
    feedbackResult.header.topic = dbFeedbacks[0].topic;
    feedbackResult.header.senderId = dbFeedbacks[0].user_id;
    feedbackResult.header.productId = dbFeedbacks[0].product_id;
    userIdList.push(dbFeedbacks[0].userId);

    return db.messages.findAll({
      where: {
        feedback_id: feedbackId,
      },
      raw: true
    })
  })
  .then(dbMessages => {
    dbMessages.forEach(dbMessage => {
      feedbackResult.messages.push({senderId: dbMessage.user_id, body: dbMessage.content, createdDate: dbMessage.createdAt, read: false});
      if (!userIdList.includes(dbMessage.user_id)) {
        userIdList.push(dbMessage.user_id);
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
    dbUsers.forEach(dbUser => {
      feedbackResult.senders.push({senderId: dbUser.id, name: dbUser.name, mail: dbUser.mail});
    });
    return feedbackResult;
  });


}

module.exports = {
  getFeedbackIdByToken: getFeedbackIdByToken,
  getFeedbackDetailById: getFeedbackDetailById,
}
