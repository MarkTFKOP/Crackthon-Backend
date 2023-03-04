import { NextFunction, Request, Response } from "express";
import multer from "multer";
const destination = multer({ dest: "/uploads" });
const upload = multer().single("avatar");

function uploadFile(req: Request, res: Response, Next: NextFunction) {
  try {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
      } else if (err) {
        // An unknown error occurred when uploading.
      }
      console.log(req.file);
      console.log(req.files);
    });
    Next();
  } catch (error) {
    console.log(error);
    Next();
  }
}

export default uploadFile;
