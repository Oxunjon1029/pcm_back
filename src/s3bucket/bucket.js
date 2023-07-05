require('dotenv').config({ debug: true })
const aws = require('aws-sdk')
const { promisify } = require('util')
const crypto = require('crypto');
const region = "eu-north-1"
const bucketName = "personalcollectionmanagement"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const randomBytes = promisify(crypto.randomBytes)


const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
})

const generateUploadUrl = async () => {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
  })
  const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
  return uploadUrl
}

module.exports = {
  generateUploadUrl
}