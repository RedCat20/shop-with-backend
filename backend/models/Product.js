import mongoose from 'mongoose';
import User from "./User.js";

const ProductSchema = new mongoose.Schema({
    // required
    name: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      //type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    // not required
    imageURL: String,
    },
  {
      timestamps: true,
  }
);

export default mongoose.model('Product', ProductSchema);