import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const RestaurantSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("restaurant", RestaurantSchema);
