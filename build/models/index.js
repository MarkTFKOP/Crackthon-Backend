"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var category_1 = __importDefault(require("./category"));
var auth_1 = __importDefault(require("./auth"));
var restaurants_1 = __importDefault(require("./restaurants"));
var foods_1 = __importDefault(require("./foods"));
// let test;
// Object.entries(mongooseObject).forEach((_, ind) => {
//   test = _[0];
//   mongoose.model(test, _[1]);
//   Object.defineProperties(mongooseObject, {
//     category: { value: mongoose.model(_[0], _[1]), writable: false },
//   });
// });
exports.default = {
    category: category_1.default,
    auth: auth_1.default,
    restaurants: restaurants_1.default,
    foods: foods_1.default,
};
