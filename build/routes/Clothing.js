"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = __importDefault(require("../controllers"));
var multer_1 = __importDefault(require("multer"));
var upload = (0, multer_1.default)({ dest: "./uploads/" });
var router = (0, express_1.Router)();
exports.default = (function (app) {
    app.use("/Clothes", router);
    router.get("/user", 
    //    middlewares.isAuth, 
    controllers_1.default.Clothes.getAllClothes);
    router.post("/add", 
    //    middlewares.isAuth, 
    controllers_1.default.Clothes.AddClothes);
    return router;
});
