"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import uploadData from "./uploadData";
var isAuth_1 = __importDefault(require("./isAuth"));
var isRole_1 = __importDefault(require("./isRole"));
exports.default = {
    isAuth: isAuth_1.default,
    isRole: isRole_1.default,
};
