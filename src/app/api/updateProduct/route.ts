import { NextResponse } from 'next/server';
import Product from '@/app/models/product'; // Adjust path if necessary
import { productSchema } from '@/zodValidation/productSchema';
import dbConnect from '@/app/libs/dbConnect';
import z from "zod";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Ensure database connection
    await dbConnect();

    // Extract product ID and data from the request
    const { id } = params;
    const updateData = await req.json(); // Parse the request body

    // Validate incoming data using Zod schema
    const validatedData = productSchema.partial().parse(updateData); // Use `.partial()` for partial updates

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, validatedData, {
      new: true, // Return the updated document
      runValidators: true, // Validate updated fields
    }).lean(); // Convert to plain JavaScript object

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Respond with the updated product
    return NextResponse.json(updatedProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    } else {
      // Handle other errors
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}
