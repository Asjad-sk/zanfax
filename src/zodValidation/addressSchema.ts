import { z } from 'zod';


// Define the Zod schema for the address
export const addressSchema = z.object({
  address: z.string().optional(), // Optional field
  city: z.string().optional(), // Optional field
  state: z.string().optional(), // Optional field
  pinCode: z.number().optional(), // Optional field
  country: z.string().optional(), // Optional field
  landmark: z.string().optional(), // Optional field
});
