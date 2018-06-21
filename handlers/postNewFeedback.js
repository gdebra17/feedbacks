const feedbacksService = require("./../services/feedbacksService");

function postNewFeedback(request, result) {
  console.log("handlers/postNewFeedback:", request.body);
  const username = request.body.username;
  const mail = request.body.mail;
  const path_image_user = request.body.path_image_user;
  const topic = request.body.topic;
  const content = request.body.content;
  const decathlonid = request.body.decathlonid;
  const photo = "";

  return feedbacksService.createNewFeedback(username, mail, path_image_user, topic, content, decathlonid, photo)
  .then(infos => {
    if (infos.errorMessage) {
      result.json({status: "error", errorMessage: infos.errorMessage});
    } else {
      result.json({status: "succeeded", data: infos});
    }
  })
}

module.exports = postNewFeedback;
