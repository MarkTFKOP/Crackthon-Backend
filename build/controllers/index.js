"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("./auth"));
var Clothes_1 = __importDefault(require("./Clothes"));
exports.default = {
    auth: auth_1.default,
    Clothes: Clothes_1.default
};
