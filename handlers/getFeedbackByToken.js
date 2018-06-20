const feedbacksService = require("./../services/feedbacksService");

function getFeedbackByToken(request, result) {
  const feedbackToken = request.params.token;
  //console.log("handlers/getFeedbackById:", feedbackToken);
  return feedbacksService.getFeedbackIdByToken(feedbackToken)
  .then(feedbackId => {
    //console.log("handlers/feedbackId:", feedbackId);
    return feedbacksService.getFeedbackDetailById(feedbackId)
      .then((infos) => {
        result.json(infos);
      });
  })
}

module.exports = getFeedbackByToken;
