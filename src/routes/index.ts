import { Router } from "express";
import OpenAI from "./OpenAI";
import auth from "./auth";
import Clothing from "./Clothing";
import Designs from "./Designs";
const app = Router();

export default () => {
  auth(app);
  Clothing(app);
  Designs(app);
  OpenAI(app)
  return app;
};
