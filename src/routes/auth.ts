import { Router } from "express";
import controllers from "../controllers";
import { uploadData } from "../middlewares/uploadData";
import uploadFile from "../middlewares/uploadFile";
import middlewares from "../middlewares";
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const router = Router();
export default (app: Router) => {
  app.use("/", router);
  router.get("/user", middlewares.isAuth, controllers.auth.GetUser);
  router.post("/register", controllers.auth.Register);
  router.post("/login", controllers.auth.Login);
  router.patch("/user", middlewares.isAuth, controllers.auth.UpdateUser);
  router.post("/logout", middlewares.isAuth, controllers.auth.Logout);
  return router;
};
