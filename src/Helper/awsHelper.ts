import multer from "multer";
import Aws from "aws-sdk";

export default function AWS() {
  try {
    const s3 = new Aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
      secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET, // secretAccessKey is also store in .env file
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
      Key: "Filename", // Name of the image
      Body: "FileBuffer", // Body which will contain the image in buffer format
      ACL: "public-read-write", // defining the permissions to get the public link
      ContentType: "image/jpeg", // Necessary to define the image content-type to view the photo in the browser with the link
    };

    s3.upload(params, (error, data) => {
      if (error) {
        console.log("error");
      }
      console.log("success");
    });
    console.log("hey");
  } catch (error) {
    console.log(error);
  }
}
// const storage = multer.memoryStorage({
//   destination: function (req, file, cb) {
//     cb(null, "");
//   },
// });

// const filefilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// // defining the upload variable for the configuration of photo being uploaded
// const upload = multer({ storage: storage, fileFilter: filefilter });

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
