const feedbacksService = require("./../services/feedbacksService");

function getFeedbackByToken(request, result) {
  const feedbackToken = request.params.token;
  //console.log("handlers/getFeedbackById:", feedbackToken);
  return feedbacksService.getFeedbackHeaderByToken(feedbackToken)
  .then(feedbackHeader => {
    //console.log("handlers/feedbackHeader:", feedbackHeader);
    return feedbacksService.getFeedbackDetailById(feedbackHeader.id)
      .then((infos) => {
        result.json(infos);
      });
  })
}

module.exports = getFeedbackByToken;
