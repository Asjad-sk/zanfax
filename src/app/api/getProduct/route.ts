import { NextResponse } from 'next/server'; 
import Product from '@/app/models/product'; // Adjust path if necessary
import dbConnect from '@/app/libs/dbConnect';

export async function GET(req: Request) {
  try {
    // Ensure database connection
    await dbConnect();

    // Extract query parameters from the request URL
    const url = new URL(req.url);
    const searchTerm = url.searchParams.get('search'); // Search term for keyword matching
    const category = url.searchParams.get('category');
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');

    // Build the query object
    const query: any = {};

    // Add search term to the query if provided
    if (searchTerm) {
      query.name = { $regex: new RegExp(searchTerm, 'i') }; // Case-insensitive search for name
    }

    // Add category filter if provided
    if (category) {
      query.category = category;
    }

    // Initialize price filter object
    let priceFilter: any = {};
    
    if (minPrice) {
      priceFilter.$gte = Number(minPrice);
    }
    if (maxPrice) {
      priceFilter.$lte = Number(maxPrice);
    }

    if (Object.keys(priceFilter).length > 0) {
      query.price = priceFilter;
    }

    // Fetch products from the database with optional filtering
    const products = await Product.find(query).lean();

    // Respond with the products
    return NextResponse.json(products);
  } catch (error) {
    // Handle any errors that occur during fetching
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
