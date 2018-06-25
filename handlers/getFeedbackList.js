const feedbacksService = require("./../services/feedbacksService");

function getFeedbackList(request, result) {
  //console.log("handlers/getFeedbackList");
  return feedbacksService.getFeedbackList()
  .then((infos) => {
    result.header("Access-Control-Allow-Origin", "*");
    result.json(infos);
  })
}

module.exports = getFeedbackList;
