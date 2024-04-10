const { PutObjectCommand } = require('@aws-sdk/client-s3');
const {s3Client} = require("../config/s3Config")
const config = require("../config/config");

const handleImageUpload = async (base64Data, fieldName) => {
  return new Promise((resolve, reject) => {
    const bucketName = config.aws.bucketName; // Replace with your S3 bucket name
    const format = 'png'; // Change the format according to your needs
    const directoryName = `Makan/${fieldName}`; // Replace with your S3 folder structure
    const fileName = `image_${Date.now()}.${format}`;

    const base64ImageData = base64Data.replace(
      /^data:image\/[a-z]+;base64,/,
      ''
    );
    const fileContent = Buffer.from(base64ImageData, 'base64');

    const params = {
      Bucket: bucketName,
      Key: `${directoryName}/${fileName}`,
      Body: fileContent,
      ContentType: `image/${format}`,
    };

    const uploadCommand = new PutObjectCommand(params);

    s3Client
      .send(uploadCommand)
      .then((data) => {
        const imageUrl = `https://${bucketName}.s3.amazonaws.com/${directoryName}/${fileName}`;
        resolve(imageUrl);
      })
      .catch((err) => {
        console.error('Error uploading image to S3:', err);
        reject(err);
      });
  });
};

module.exports = {
  handleImageUpload,
};
