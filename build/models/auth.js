"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var AuthSchema = new mongoose_1.default.Schema({
    name: { type: String },
    email: { type: String },
    username: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    uuid: { type: String },
    role: {
        type: String,
        enum: ["user", "admin", "restaurant"],
        default: "user",
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("user", AuthSchema);
