import mongoose from 'mongoose';
import User from "./User.js";

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    /// Зв'язок між 2 таблицями
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
    // discount: {
    //   type: Number,
    //   required: false,
    // },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    // color: {
    //   type: String,
    //   required: false,
    // },
    // size: {
    //   type: String,
    //   required: false,
    // },
    // producer: {
    //   type: String,
    //   required: false,
    // },
    imageURL: String,
  }, {
    timestamps: true,
  }
);

export default mongoose.model('Product', ProductSchema);