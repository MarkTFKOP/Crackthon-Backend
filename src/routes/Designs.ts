import { Router } from "express";
import controllers from "../controllers";
import { uploadData } from "../middlewares/uploadData";
import uploadFile from "../middlewares/uploadFile";
import middlewares from "../middlewares";
import multer from "multer";
const upload = multer();
const router = Router();
export default (app: Router) => {
  app.use("/designs", router);
  router.post("/getDesigns");
  router.post("/simple", controllers.Designs.simpleGenerateDesigns);
  router.post(
    "/generateDesigns",
    upload.single("testImage"),
    controllers.Designs.generateDesigns
  );
  router.post("/getPixel", controllers.Designs.getPixel);
  router.post(
    "/imageUpload",
    upload.single("images"),
    middlewares.uploadPixelBin,
    controllers.Designs.imageUpload
  );
  router.post("/generateDesignsWithOpenAI",controllers.Designs.generateDesignsWithOpenAI);
  return router;
};
