const feedbacksService = require("./../services/feedbacksService");

function getAllMessages(request, result) {
  //console.log("handlers/getAllMessages");
  return feedbacksService.dbMessageUserToFacade()
  .then((infos) => {
    result.header("Access-Control-Allow-Origin", "*");
    result.json(infos.body);
  })
}

module.exports = getAllMessages;
