const feedbacksService = require("./../services/feedbacksService");

function getFeedbackList(request, result) {
  //console.log("handlers/getFeedbackList");
  const decathlonid = request.params.decathlonid;
  return feedbacksService.getFeedbackList(decathlonid)
  .then((infos) => {
    result.json(infos);
  })
}

module.exports = getFeedbackList;
