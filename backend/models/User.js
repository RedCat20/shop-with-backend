import mongoose from 'mongoose';

export const UserModel = new mongoose.Schema({
    // required
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordWithHash: {
      type: String,
      required: true,
    },
    // not required
    age: Number,
    address: String,
    avatarURL: String,
  },

  {
    timestamps: true
  }
);

export default mongoose.model('User', UserModel);