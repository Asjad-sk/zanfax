// models/Order.js

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  products: [
    {
      
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assum
        required: true,
      },
      imageUrl:{
        type:String,
        required:true
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      size:{
        type:String,
        required:true
      },
      status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        required:true,
        default: 'pending',
      },
    },
  ],
  
  
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    landmark:{
      type:String,
      
    },
    country: {
      type: String,
      required: true,
    }
  
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  phoneNumber:{
    type:Number,
    required:true
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
