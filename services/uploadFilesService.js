const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk');


const s3 = new aws.S3({ accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY });

function copyUploadFileFromAwsToLocalServer(fileName) {
  console.log('copyUploadFileFromAwsToLocalServer: fileName', fileName);
  return new Promise(
    function(resolve, reject) {
      const getParams = {
          Bucket: process.env.S3_BUCKET,
          Key: fileName
      };
      s3.getObject(getParams, function (err, file) {
          if (err) {
              console.log('copyUploadFileFromAwsToLocalServer: error=', err);
          } else {
              console.log('file.Body=', file.Body);
              const destination = path.join(__dirname, './../uploads/' + getParams.Key);
              console.log('destination=', destination);
              fs.writeFileSync(destination, file.Body);
              resolve("ok");
          }
      });
    }
  );
}

module.exports = {
  copyUploadFileFromAwsToLocalServer: copyUploadFileFromAwsToLocalServer,
}
