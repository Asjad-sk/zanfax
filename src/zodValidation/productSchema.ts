import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.preprocess((value:any)=>parseFloat(value),z.number() ),
  category: z.string().min(1, "please select a category"),
  sizes: z.array(z.string()), // Ensure sizes is an array of strings
  color: z.array(z.string()), // Ensure color is an array of strings
  stock: z.number().nonnegative("Stock cannot be negative"),
  images: z.array(z.string().min(1, "please upload atleast one image")),
  brand: z.string(),
  rating: z.number().min(0).max(5).optional(), // Rating should be between 0 and 5
  reviews: z.array(z.string()).optional(),
});
