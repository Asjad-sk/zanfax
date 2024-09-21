import { NextResponse } from 'next/server';
import Product from '@/app/models/product'; // Adjust path if necessary
import dbConnect from '@/app/libs/dbConnect';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Ensure database connection
    await dbConnect();

    // Extract the ID from the params
    const { id } = params;

    // Fetch the product by ID from the database
    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Respond with the product data
    return NextResponse.json(product);
  } catch (error) {
    // Handle any errors that occur during fetching
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
