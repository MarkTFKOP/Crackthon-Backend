import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("user", AuthSchema);
