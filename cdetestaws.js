const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk');

const configAws = {
  AWS_ID: process.env.S3_ACCESS_KEY_ID,
  AWS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  AWS_BUCKET: process.env.S3_BUCKET,
}

var s3 = new aws.S3({ accessKeyId: configAws.AWS_ID, secretAccessKey: configAws.AWS_KEY });

console.log('config=', configAws);

var getParams = {
    Bucket: configAws.AWS_BUCKET,
    Key: 'bonjour.txt',
    //Key: '1536738414339-codeacademy.JPG',
}


//Fetch or read data from aws s3
s3.getObject(getParams, function (err, file) {

    if (err) {
        console.log(err);
    } else {
        console.log(file.Body); //this will log data to console
        const destination = path.join(__dirname, "./uploads/" + getParams.Key);
        console.log('destination=', destination);
        fs.writeFileSync(destination, file.Body);
    }

})
