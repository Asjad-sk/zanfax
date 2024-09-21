// app/api/addProduct/route.ts
import Product from "@/app/models/product";
import { productSchema } from "@/zodValidation/productSchema";
import { NextResponse } from "next/server";
import z from 'zod';
import dbConnect from "@/app/libs/dbConnect";
// POST request handler
export async function POST(req: Request) {
    try {
        await dbConnect();
        
        // Parse and validate the request body using Zod schema
        const validatedData = productSchema.parse(await req.json());

        // Create a new product using Mongoose
        const newProduct = new Product(validatedData);

        // Save the new product to the database
        await newProduct.save();
        console.log(newProduct);

        // Respond with the newly created product
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors
            console.log(error)
            return NextResponse.json({ errors: error.errors }, { status: 400 });
        } else {
            // Handle other errors
            // console.log(error)
            console.log(error)
            return NextResponse.json({ error: 'Internal Server Error',errors:error }, { status: 500 });
            
        } 
    }
}

// For unsupported methods
export async function GET() {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
