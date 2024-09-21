import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the review
export interface IReview extends Document {
  user: mongoose.Types.ObjectId; // Reference to the User model
  product: mongoose.Types.ObjectId; // Reference to the Product model
  comment: string;
  rating: number;
  createdAt?: Date;
}

// Define the schema for the review
const reviewSchema = new Schema<IReview>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;
