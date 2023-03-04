"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var argon2_1 = __importDefault(require("argon2"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var models_1 = __importDefault(require("../models"));
var authModel = models_1.default.auth;
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.Register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var createObj, hash, registeredUser, token, uuid, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        createObj = {};
                        Object.assign(createObj, { name: req.body.name });
                        Object.assign(createObj, { email: req.body.email });
                        Object.assign(createObj, { username: req.body.username });
                        return [4 /*yield*/, argon2_1.default.hash(req.body.password)];
                    case 1:
                        hash = _a.sent();
                        //   let uuid = await argon2.hash("password");
                        Object.assign(createObj, { password: hash });
                        return [4 /*yield*/, authModel.create(createObj)];
                    case 2:
                        registeredUser = _a.sent();
                        registeredUser = registeredUser.toObject();
                        delete registeredUser.password;
                        delete registeredUser.__v;
                        token = jsonwebtoken_1.default.sign(registeredUser, process.env.JSON_WEB_TOKEN || "");
                        return [4 /*yield*/, argon2_1.default.hash(JSON.stringify(registeredUser))];
                    case 3:
                        uuid = _a.sent();
                        delete registeredUser.isDeleted;
                        delete registeredUser.createdAt;
                        delete registeredUser.isActive;
                        delete registeredUser.updatedAt;
                        delete registeredUser.role;
                        res.cookie("token", "Bearer ".concat(token));
                        res.success.success("Registration succesful", registeredUser);
                        return [4 /*yield*/, authModel.updateOne({ _id: registeredUser._id }, { uuid: uuid.substring(uuid.length / 1.32), token: token })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        if (error_1.code && error_1.code == 11000)
                            return [2 /*return*/, res.error.Unauthorized("Username already exists")];
                        return [2 /*return*/, res.error.ServerError("Something went wrong")];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.Login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var createObj, loggedInUser, checklogged, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        createObj = {};
                        Object.assign(createObj, { username: req.body.username });
                        return [4 /*yield*/, authModel
                                .findOne(createObj)
                                .select("-__v -token -uuid")];
                    case 1:
                        loggedInUser = _a.sent();
                        try {
                            if (!loggedInUser._id)
                                throw res.error.Unauthorized("User not found");
                        }
                        catch (error) {
                            return [2 /*return*/, res.error.Unauthorized("User not found")];
                        }
                        return [4 /*yield*/, argon2_1.default.verify(loggedInUser.password, req.body.password)];
                    case 2:
                        checklogged = _a.sent();
                        if (!checklogged)
                            return [2 /*return*/, res.error.Unauthorized("Passwords don't match")];
                        loggedInUser = loggedInUser.toObject();
                        token = jsonwebtoken_1.default.sign(loggedInUser, process.env.JSON_WEB_TOKEN || "");
                        loggedInUser.token = token;
                        delete loggedInUser.password;
                        delete loggedInUser.isDeleted;
                        delete loggedInUser.createdAt;
                        delete loggedInUser.isActive;
                        delete loggedInUser.updatedAt;
                        delete loggedInUser.role;
                        res.cookie("token", "Bearer ".concat(token));
                        res.success.success("Login succesful", loggedInUser);
                        return [4 /*yield*/, authModel.updateOne({ _id: loggedInUser._id }, { token: token })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.error.ServerError("Something went wrong")];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.GetUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(req.user);
                        return [4 /*yield*/, authModel
                                .findOne({ _id: req.user._id })
                                .select("name username token email -_id")];
                    case 1:
                        user = _a.sent();
                        // console.log("req.user", req.user);
                        return [2 /*return*/, res.success.success("Details fetched", user)];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, res.error.ServerError("Something went wrong")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.UpdateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var update, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        update = {};
                        if (req.body.name)
                            Object.assign(update, { name: req.body.name });
                        if (req.body.email)
                            Object.assign(update, { email: req.body.email });
                        return [4 /*yield*/, authModel.updateOne({ _id: req.user._id }, update)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send("updated")];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.Logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, authModel.updateOne({ _id: req.user._id }, { token: "" })];
                    case 1:
                        _a.sent();
                        res.clearCookie("token");
                        return [2 /*return*/, res.success.success("Logout successful", "Logout successful")];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.default = new User();
