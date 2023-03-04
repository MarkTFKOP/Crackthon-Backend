"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var FoodSchema = new mongoose_1.default.Schema({
    foodName: { type: String, required: true },
    price: { type: Number },
    categoryId: { type: ObjectId },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: {
        userId: { type: ObjectId },
        Date: { type: Date, default: new Date() },
    },
    updatedBy: {
        userId: { type: ObjectId },
        Date: { type: Date, default: new Date() },
    },
    deletedBy: {
        userId: { type: ObjectId },
        Date: { type: Date, default: new Date() },
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("food", FoodSchema);
