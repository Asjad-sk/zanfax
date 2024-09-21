import dbConnect from "@/app/libs/dbConnect";
import Order from "@/app/models/order";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ msg: "Invalid userId" }, { status: 400 });
        }

        const orders = await Order.find({ user: userId }).exec();

        if (orders.length === 0) {
            // Return a 200 status with a message indicating no orders
            return NextResponse.json({ msg: "There are no orders for this user" }, { status: 200 });
        }

        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error); // More descriptive error logging
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}
