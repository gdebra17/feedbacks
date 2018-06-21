const path = require("path");
const multer = require("multer");

const feedbacksService = require("./../services/feedbacksService");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./../uploads/"),
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage }).single("photo");

function postNewFeedback(request, result) {
  console.log("handlers/postNewFeedback:", request.body);

  upload(request, result, function(err) {
    if (err) {
      result.json({status: "error", errorMessage: "Error uploading file."});
    }
    console.log("handlers/postNewFeedback in upload:", request.body);
    const username = request.body.username;
    const mail = request.body.mail;
    const pathImageUser = request.body.path_image_user;
    const topic = request.body.topic;
    const feebackcontent = request.body.feebackcontent;
    const decathlonid = request.body.decathlonid;
    let pathPhoto;
    if (request.file) {
      pathPhoto = request.file.filename;
    }

    return feedbacksService.createNewFeedback(username, mail, pathImageUser, topic, feebackcontent, decathlonid, pathPhoto)
    .then(infos => {
      if (infos.errorMessage) {
        result.json({status: "error", errorMessage: infos.errorMessage});
      } else {
        result.json({status: "succeeded", data: infos});
      }
    })
  });
}

module.exports = postNewFeedback;
