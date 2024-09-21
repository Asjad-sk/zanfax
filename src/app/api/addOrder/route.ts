import { NextResponse } from 'next/server';
import Order from '@/app/models/order';
import { orderSchema } from '@/zodValidation/orderSchema';

export async function POST(request: Request) {
  try {
    const validateOrder = orderSchema.parse(await request.json())
    // Log received data
    console.log(validateOrder)
    // Validate each product for status


    // Create a new order with the received data
    const order = new Order(validateOrder);
    const savedOrder = await order.save();
    console.log(savedOrder)
    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    // Type assertion to ensure error is an instance of Error
    if (error instanceof Error) {
      console.error('Save Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      console.error('Unexpected Error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
