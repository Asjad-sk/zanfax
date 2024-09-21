import { NextResponse } from 'next/server';
import Product from '@/app/models/product'; // Adjust the path as needed
import dbConnect from '@/app/libs/dbConnect';

export async function GET(req: Request) {
  try {
    await dbConnect();
    
    // Extract query parameter from the request URL
    const url = new URL(req.url);
    const query = url.searchParams.get('query');
    
    if (!query) {
      return NextResponse.json([]);
    }

    // Fetch product names that start with the query
    const products = await Product.find({
      name: { $regex: `^${query}`, $options: 'i' } // Case-insensitive search
    }).select('name').limit(10).lean();

    // Respond with the product names
    return NextResponse.json(products.map(p => p.name));
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
