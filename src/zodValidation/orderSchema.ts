import * as z from 'zod';

export const orderSchema = z.object({
  user: z.string(),
  products: z.array(
    z.object({
      product: z.string().nonempty(), // Use 'product' instead of 'productId'
      imageUrl: z.string(),
      quantity: z.number().positive().int(),
      price: z.number().positive(),
      size: z.string(),
      status: z.string()
    })
  ),
  totalAmount: z.number().positive(),
  shippingAddress: z.object({
    address: z.string().nonempty(),
    city: z.string().nonempty(),
    pincode: z.string().nonempty(),
    country: z.string().nonempty(),
    landmark: z.string().optional(),
  }),
  phoneNumber: z.string().nonempty(),
});
