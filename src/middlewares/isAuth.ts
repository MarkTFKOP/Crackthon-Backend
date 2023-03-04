import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import models from "../models";
const authModel = models.auth;
export default async function isAuth(
  req: any,
  res: Response,
  next: NextFunction
) {
  let decryptToken: string | Object = "";
  let token: string | undefined = "";
  try {
    // if (!req.headers.authorization?.includes("Bearer "))
    //   throw res.send("Auth token does not exist");
    // token = req.headers.authorization?.split("Bearer ")[1];
    if (!req.cookies.token?.includes("Bearer "))
      throw res.send("Auth token does not exist");
    token = req.cookies.token?.split("Bearer ")[1];
    decryptToken = await jwt.verify(
      token || "",
      process.env.JSON_WEB_TOKEN || ""
    );
    // console.log(decryptToken);
    let user: any = await authModel.findOne({ token: token });
    if (!user._id) return res.send("Auth token is invalid");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.send("Auth token is invalid");
  }
}
