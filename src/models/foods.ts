import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const FoodSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("food", FoodSchema);
