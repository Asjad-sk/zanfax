// models/User.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string; // updated from pinCode to zipCode
    country?: string;
    landmark?: string; // added landmark
  };
  profilepicture?: string;
  phoneNumber?: string;
  isAdmin?: boolean;
  createdAt?: Date;
  
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }, // updated from pinCode to zipCode
    country: { type: String },
    landmark: { type: String } // added landmark
  },
  profilepicture: { type: String },
  phoneNumber: { type: String },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Ensure you are defining the model only once
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
