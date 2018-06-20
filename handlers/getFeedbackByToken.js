const feedbacksService = require("./../services/feedbacksService");

function getFeedbackByToken(request, result) {
  const feedbackToken = request.params.token;
  //console.log("handlers/getFeedbackById:", feedbackToken);
  return feedbacksService.getFeedbackDetailByToken(feedbackToken)
    .then((infos) => {
      result.json(infos);
    });
}

module.exports = getFeedbackByToken;
