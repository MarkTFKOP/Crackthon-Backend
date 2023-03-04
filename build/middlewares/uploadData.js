"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadData = void 0;
var multer_1 = __importDefault(require("multer"));
var destination = (0, multer_1.default)({ dest: "/uploads" });
var uploadData = function (req, res, next) {
    try {
        console.log(req);
        next();
    }
    catch (error) {
        console.log(error);
        next();
    }
};
exports.uploadData = uploadData;
