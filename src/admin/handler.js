const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({ region: 'us-east-1' }); // TODO: Get from env?

function generateSlug(length) {
  let slug = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for(var idx = 0; idx < length; idx++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return slug;
}

exports.handler = async function (event) {
  console.log('event', event);

  // TODO: validate/sanitize inputs

  // TODO: Check for base64 encoding
  var request = JSON.parse(event.body);

  if (!request.shortUrl) {
    request.shortUrl = generateSlug(6);
  }
  var cmd = new PutObjectCommand({
    Bucket: process.env.AWS_BucketName,
    Key: `redir/${request.shortUrl}`,
    Body: '',
    WebsiteRedirectLocation: request.destinationUrl,
  });

  await s3.send(cmd);
  return JSON.stringify({ "shortUrl": request.shortUrl, "url": `https://${process.env.AWS_CloudFrontDomain}/${request.shortUrl}` });
}
