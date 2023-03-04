import { NextFunction, Request, Response } from "express";
import multer from "multer";
const destination = multer({ dest: "/uploads" });

export const uploadData: any = (req: Request, res: Response, next: any) => {
  try {
    console.log(req);
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
