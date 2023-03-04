"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("./auth"));
var Clothing_1 = __importDefault(require("./Clothing"));
var app = (0, express_1.Router)();
exports.default = (function () {
    (0, auth_1.default)(app);
    (0, Clothing_1.default)(app);
    return app;
});
