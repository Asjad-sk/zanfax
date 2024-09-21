import mongoose, { Document, Schema } from 'mongoose';
import { IReview } from './review';

// Define the interface for the product document
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: 'Polo' | 'Half sleeves t-shirt' | 'Hoodies' | 'Sweat-Shirt'; // Add more categories as needed
  sizes: Array<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>; // List of available sizes
  color: string[]; // Array of colors for the product
  stock: number;
  images: string[]; // Array of image URLs
  brand?: string;
  rating?: number;
  reviews?: IReview[]; // Array of review objects
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive']
  },
  category: {
    type: String,
    enum: ['Polo', 'Half sleeves t-shirt', 'Hoodies', 'Sweat-Shirt'], // Add more categories as needed
    required: true
  },
  sizes: {
    type: [String],
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], // List of available sizes
    required: true
  },
  color: {
    type: [String], // Array of colors for the product
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative']
  },
  images: {
    type: [String], // Array of image URLs
    required: true
  },
  brand: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review' // Reference to the Review model
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update `updatedAt` field before saving
productSchema.pre<IProduct>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
