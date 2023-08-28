const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({ region: 'us-east-1' }); // TODO: Get from env?

exports.handler = async function (event, context) {
  console.log('event', event);
  console.log('context', context);
  console.log('env', process.env);

  // TODO: Generate random short string if not provided
  // TODO: validate/sanitize inputs

  // TODO: Check for base64 encoding
  var request = JSON.parse(event.body);

  var cmd = new PutObjectCommand({
    Bucket: process.env.AWS_BucketName,
    Key: `redir/${request.shortUrl}`,
    Metadata: {
      "website-redirect-location": request.destinationUrl,
    },
    Body: '',
  });

  await s3.send(cmd);
  return JSON.stringify({ "status": "ok" });
}

