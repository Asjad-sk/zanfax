import { NextResponse } from 'next/server';
import dbConnect from '@/app/libs/dbConnect';
import Order from '@/app/models/order'; // Ensure this matches your actual model name


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await dbConnect();
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
