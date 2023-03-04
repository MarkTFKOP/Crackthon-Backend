"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = __importDefault(require("../controllers"));
var middlewares_1 = __importDefault(require("../middlewares"));
var multer = require("multer");
var upload = multer({ dest: "./uploads/" });
var router = (0, express_1.Router)();
exports.default = (function (app) {
    app.use("/", router);
    router.get("/user", middlewares_1.default.isAuth, controllers_1.default.auth.GetUser);
    router.post("/register", controllers_1.default.auth.Register);
    router.post("/login", controllers_1.default.auth.Login);
    router.patch("/user", middlewares_1.default.isAuth, controllers_1.default.auth.UpdateUser);
    router.post("/logout", middlewares_1.default.isAuth, controllers_1.default.auth.Logout);
    return router;
});
