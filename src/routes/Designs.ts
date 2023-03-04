import { Router } from "express";
import controllers from "../controllers";
import { uploadData } from "../middlewares/uploadData";
import uploadFile from "../middlewares/uploadFile";
import middlewares from "../middlewares";
import multer from "multer";
const upload = multer({ dest: "./uploads/" });
const router = Router();
export default (app: Router) => {
  app.use("/designs", router);
  router.post("/getDesigns");
  router.post("/generateDesignsOnEvent");
  router.post("/generateDesignsOnEvent");
  return router;
};
