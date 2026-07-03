import mongoose from "mongoose";

const DiscountSchema = new mongoose.Schema(
  {
    product_name: String,
    desc: String,
    image: String,
    price: Number,
    orgprice: Number,
    rating: Number,
    dist: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Discount ||
  mongoose.model("Discount", DiscountSchema);