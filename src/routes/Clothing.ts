import { Router } from "express";
import controllers from "../controllers";
import { uploadData } from "../middlewares/uploadData";
import uploadFile from "../middlewares/uploadFile";
import middlewares from "../middlewares";
import multer from "multer";
const upload = multer();
const router = Router();
export default (app: Router) => {
  app.use("/clothes", router);
  router.get(
    "/get",
    //    middlewares.isAuth,
    controllers.Clothes.getAllClothes
  );
  router.post(
    "/add",
    upload.single("productImage"),
    middlewares.uploadPixelBin,
    controllers.Clothes.AddClothes
  );
  router.post("/check", controllers.Clothes.check);
  router.put("/lookout/:id", controllers.Clothes.lookout);
  router.put("/purchase/:id", controllers.Clothes.purchase);
  router.post("/getDesigns");
  router.post("/generateDesignsOnEvent");
  router.post("/generateDesignsOnEvent");
  return router;
};
