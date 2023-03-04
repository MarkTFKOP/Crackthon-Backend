"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var CategorySchema = new mongoose_1.default.Schema({
    categoryName: { type: String, required: true },
    categoryId: { type: Number },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    parentId: { type: ObjectId },
    createdBy: { type: ObjectId, Date: new Date(), required: true },
    updatedBy: { type: ObjectId, Date: new Date() },
    deletedBy: { type: ObjectId, Date: new Date() },
}, { timestamps: true });
CategorySchema.pre("save", function (next, done) {
    next();
});
CategorySchema.post("save", function (next, done) {
    done();
});
exports.default = mongoose_1.default.model("category", CategorySchema);
