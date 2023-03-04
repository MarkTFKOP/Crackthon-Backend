"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var express_2 = __importDefault(require("./loaders/express"));
(0, dotenv_1.config)();
(0, express_2.default)(express_1.default);
