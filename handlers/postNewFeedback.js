const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./../uploads/"),
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage }).single("photo");

const feedbacksService = require("./../services/feedbacksService");

function postNewFeedback(request, result) {
  console.log("handlers/postNewFeedback:", request.body);

  console.log("postNewFeedback 1:", Date.now());
  upload(request,result,function(err) {
          if(err) {
              return result.end("Error uploading file.");
          }
          console.log("postNewFeedback 2:", Date.now());
          //result.end("File is uploaded");
      });

  console.log("postNewFeedback 3:", Date.now());
  const username = request.body.username;
  const mail = request.body.mail;
  const path_image_user = request.body.path_image_user;
  const topic = request.body.topic;
  const content = request.body.content;
  const decathlonid = request.body.decathlonid;
  const photo_url = "";

  return feedbacksService.createNewFeedback(username, mail, path_image_user, topic, content, decathlonid, photo_url)
  .then(infos => {
    if (infos.errorMessage) {
      result.json({status: "error", errorMessage: infos.errorMessage});
    } else {
      result.json({status: "succeeded", data: infos});
    }
  })
}

module.exports = postNewFeedback;
