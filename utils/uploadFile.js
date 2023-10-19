const aws = require("aws-sdk")
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY
})
exports.uploadFile = async (file, path, filename) => {
  await file.mv(path + filename)
}

exports.uploadToS3 = async (file) => {
  const uploadParam = {
    Bucket: process.env.BUCKET_KEY,
    Key: Date.now() + file.name,
    Body: file.data,
    ContentType: file.mimetype
  }
  let result = await s3.upload(uploadParam).promise()
  return result.Location
}
