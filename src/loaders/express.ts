import routes from "../routes";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { customCodes } from "./statusCodes";
const expressResponseHandler = require("express-response-handler");
var cookieParser = require("cookie-parser");

export default (express: any) => {
  const app = express();
  const PORT = process.env.PORT || 3001;
  const MONGO_URI = process.env.MONGO_URI || "";

  app.use(express.json());
  app.use(expressResponseHandler(customCodes));
  app.use(cookieParser());
  app.use((req: Request, res: any, next: NextFunction) => {
    let oldSend = res.send;
    res.send = function (data: unknown) {
      // console.log(data);
      oldSend.apply(res, arguments);
    };
    next();
  });
  app.use("/", routes());

  app.use("/status", (req: Request, res: Response) => {
    res.send("server connected");
  });

  app.listen(PORT, () => {
    console.log(`
            #####################################################
                           server connected: ${PORT}
            #####################################################`);
  });

  mongoose.set("strictQuery", false);
  mongoose.connect(MONGO_URI).then(() => {
    console.log(`                           db connected
            #####################################################
      `);
  });
};
