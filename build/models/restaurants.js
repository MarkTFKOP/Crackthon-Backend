"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var RestaurantSchema = new mongoose_1.default.Schema({
    restaurantName: { type: String, required: true },
    Location: { type: String },
    userId: { type: ObjectId, required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    parentCategoryId: [{ type: ObjectId }],
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
exports.default = mongoose_1.default.model("restaurant", RestaurantSchema);
