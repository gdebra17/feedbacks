const db = require('./../models/index');
const operator = db.sequelize.Op;

function newFeedback(feedbackToken) {
  const newFeedback = {
    header : {feedbackToken},
    messages : [],
    senders : [],
  }
  return newFeedback;
}

function getFeedbackDetailByToken(feedbackToken) {
  console.log("services/getFeedbackDetailByToken:", feedbackToken);
  const feedbackResult = newFeedback(feedbackToken);
  const userIdList = [];
  let feedbackId = null;

  return db.feedbacks.findAll({
    where: {
      token: feedbackToken,
    },
    raw: true
  })
  .then(dbFeedbacks => {
    feedbackId = dbFeedbacks[0].id;
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
  getFeedbackDetailByToken: getFeedbackDetailByToken,
}
