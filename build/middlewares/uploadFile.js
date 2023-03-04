"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var destination = (0, multer_1.default)({ dest: "/uploads" });
var upload = (0, multer_1.default)().single("avatar");
function uploadFile(req, res, Next) {
    try {
        upload(req, res, function (err) {
            if (err instanceof multer_1.default.MulterError) {
                // A Multer error occurred when uploading.
            }
            else if (err) {
                // An unknown error occurred when uploading.
            }
            console.log(req.file);
            console.log(req.files);
        });
        Next();
    }
    catch (error) {
        console.log(error);
        Next();
    }
}
exports.default = uploadFile;
