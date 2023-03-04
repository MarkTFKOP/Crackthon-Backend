import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const ClothesSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    totalAnalysis: {
      views: { type: Number, default: 0 },
      purchases: { type: Number, default: 0 },
    },
    intervalAnalysis: {
      views: { type: Number, default: 0 },
      purchases: { type: Number, default: 0 },
    },
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
  },
  { timestamps: true }
);

ClothesSchema.pre("save", function (this, next, done) {
  next();
});
ClothesSchema.post("save", function (this, next, done) {
  done();
});

export default mongoose.model("clothes", ClothesSchema);
