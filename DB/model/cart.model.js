import { Schema, Types, model } from "mongoose";

const cartSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true, unique: true },
    course: [
      {
        _id: false,
        courseId: { type: Types.ObjectId, ref: "Course" },
        price: { type: Number, required: true },
        name: String,
      },
    ],
  },
  { timestamps: true }
);

const cartModel = model("Cart", cartSchema);
export default cartModel;
