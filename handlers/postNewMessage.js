const feedbacksService = require("./../services/feedbacksService");

function postNewMessage(request, result) {
  console.log("handlers/postNewMessage:", request.body);
  const feedbackToken = request.body.feedbackToken;
  const messageContent = request.body.messageContent;
  const userToken = request.body.userToken;

  return feedbacksService.getFeedbackHeaderByToken(feedbackToken)
  .then(feedbackHeader => {
    //console.log("handlers/postNewMessage:", feedbackHeader);
    let currentUserId = null;
    if (userToken) {
      //console.log("handlers/postNewMessage: message is added by userToken", userToken);
    } else {
      currentUserId = feedbackHeader.user_id;
      //console.log("handlers/postNewMessage: message is added by feedback creator", currentUserId);
    }
    return {feedbackId: feedbackHeader.id, userId: currentUserId}
  })
  .then(data => {
    //console.log("handlers/postNewMessage: insert data=", data);
    return feedbacksService.addNewMessageToFeedback(data.feedbackId, messageContent, data.userId)
  })
  .then(infos => {
    if (infos.errorMessage) {
      result.json({status: "error", errorMessage: infos.errorMessage});
    } else {
      result.json({status: "succeeded", data: infos});
    }
  })

}

module.exports = postNewMessage;
