import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    categoryId: { type: Number },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    parentId: { type: ObjectId },
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

CategorySchema.pre("save", function (this, next, done) {
  next();
});
CategorySchema.post("save", function (this, next, done) {
  done();
});

export default mongoose.model("category", CategorySchema);
