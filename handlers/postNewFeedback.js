const path = require("path");
const multer = require("multer");

const feedbacksService = require("./../services/feedbacksService");

/*
const storage = multer.diskStorage({
  destination: path.join(__dirname, "./../uploads/"),
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});
*/

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
aws.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'us-east-1'
});
const s3 = new aws.S3();

const storage = multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        key: function (req, file, callback) {
            //console.log('postNewFeedback: file=',file);
            callback(null, `${Date.now()}-${file.originalname}`);
            req.fileNameWithDate = `${Date.now()}-${file.originalname}`;
            //console.log('postNewFeedback: fileNameWithDate in storage=',req.fileNameWithDate);
        }
    })

const upload = multer({ storage: storage }).single("photo");


function postNewFeedback(request, result) {
  // console.log("handlers/postNewFeedback:", request.body);

  upload(request, result, function(err) {
    if (err) {
      console.log('postNewFeedback: err=',err);
      result.json({status: "error", errorMessage: "Error uploading file."});
    }
    // console.log("handlers/postNewFeedback in upload:", request.body);
    const username = request.body.username;
    const mail = request.body.mail;
    const pathImageUser = request.body.path_image_user;
    const topic = request.body.topic;
    const content = request.body.content;
    const decathlonid = request.body.decathlonid;
    let pathPhoto;
    //if (request.file) {
    //console.log('postNewFeedback: fileNameWithDate in upload 2=',request.fileNameWithDate);
    if (request.fileNameWithDate) {
      //pathPhoto = request.file.filename;
      pathPhoto = request.fileNameWithDate;
    }
    //console.log('postNewFeedback: pathPhoto=', pathPhoto);

    return feedbacksService.createNewFeedback(username, mail, pathImageUser, topic, content, decathlonid, pathPhoto)
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
