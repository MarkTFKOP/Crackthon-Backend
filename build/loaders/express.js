"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = __importDefault(require("../routes"));
var mongoose_1 = __importDefault(require("mongoose"));
var statusCodes_1 = require("./statusCodes");
var expressResponseHandler = require("express-response-handler");
var cookieParser = require("cookie-parser");
exports.default = (function (express) {
    var app = express();
    var PORT = process.env.PORT || 3001;
    var MONGO_URI = process.env.MONGO_URI || "";
    app.use(express.json());
    app.use(expressResponseHandler(statusCodes_1.customCodes));
    app.use(cookieParser());
    app.use(function (req, res, next) {
        var oldSend = res.send;
        res.send = function (data) {
            // console.log(data);
            oldSend.apply(res, arguments);
        };
        next();
    });
    app.use("/", (0, routes_1.default)());
    app.use("/status", function (req, res) {
        res.send("server connected");
    });
    app.listen(PORT, function () {
        console.log("\n            #####################################################\n                           server connected: ".concat(PORT, "\n            #####################################################"));
    });
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.connect(MONGO_URI).then(function () {
        console.log("                           db connected\n            #####################################################\n      ");
    });
});
