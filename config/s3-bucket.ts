import aws from "aws-sdk";
import fs from "fs";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const uploadFile = async (file: Express.Multer.File) => {
  try {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Body: fileStream,
      Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
  } catch (error) {
    throw Error("Failed to upload the file.");
  }
};

export const getFileReadStream = async (fileKey: string) => {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: process.env.AWS_BUCKET_NAME!
    };
    return s3.getObject(downloadParams).createReadStream();
  } catch (error) {
    throw Error("Failed to fetch the file.");
  }
};
