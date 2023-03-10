
import { Router } from "express";
import controllers from "../controllers";
import { uploadData } from "../middlewares/uploadData";
import uploadFile from "../middlewares/uploadFile";
import middlewares from "../middlewares";
import multer from "multer";
const upload = multer();
const router = Router();
export default (app: Router) => {
  app.use("/openAI", router);
  router.post("/getDesigns");
  router.post("/gptText", controllers.OpenAI.generateText); 
  return router;
};
