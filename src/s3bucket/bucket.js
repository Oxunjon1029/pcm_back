require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const region = "eu-north-1";
const bucketName = "personalcollectionmanagement";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const randomBytesAsync = promisify(randomBytes);

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

const generateUploadUrl = async () => {
  const rawBytes = await randomBytesAsync(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const command = new PutObjectCommand(params);
  const uploadUrl = await s3Client.getSignedUrl(command);

  return uploadUrl;
};

module.exports = {
  generateUploadUrl
};
