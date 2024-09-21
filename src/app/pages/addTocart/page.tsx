'use client';
import DialogueQty from '@/app/component/DialogueQty';
import DialogueBox from '@/app/component/DiaologueBox';
import Header from '@/app/component/Header';
import { removeItem } from '@/app/redux/slices/cartSlice';
import { Card } from '@/components/ui/card';
import { Cancel01Icon } from 'hugeicons-react';
import { ArrowLeftRight, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Ensure correct import for your Next.js version
import { Button } from '@/components/ui/button';
import { setOrderItems } from '@/app/redux/slices/orderSlice';
import { useSession, signIn } from 'next-auth/react'; // Import signIn
import { toast } from 'sonner';

export default function AddCart() {
  const cartItems = useSelector((state: any) => state.cart.items) || []; // Ensure cartItems is an array
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession(); // Get the session from NextAuth

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handlePlaceOrder = () => {
    // Filter items that are missing a size
    const missingSizeItems = cartItems.filter(item => !item.size);
    
    if (missingSizeItems.length > 0) {
      const errorMessage = "Please add size for the following items:\n" +
        missingSizeItems.map(item => item.name).join(', ');
      toast.error(errorMessage);
      return;
    }
  
    // Check if cartItems is not empty and calculate totalAmount
    if (cartItems.length > 0) {
      // Calculate totalAmount
      const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      console.log('Total Amount:', totalAmount);
  
      // Dispatch order items to the store
      dispatch(setOrderItems({
        products: cartItems,
        totalAmount: totalAmount,
      }));
  
      // Redirect to the order page
      router.push('/pages/order');
    } else {
      alert("Your cart is empty!");
    }
  };

  const handleButtonClick = () => {
    if (session) {
      handlePlaceOrder();
    } else {
      signIn(); // Redirects to the sign-in page
    }
  };

  if (!cartItems.length) {
    return <p>No products in the cart.</p>;
  }

  return (
    <>
      <Header/>
      <div>
        {cartItems.map((product: any) => (
          <Card key={product._id} className=' h-fit w-full p-2 mb-4 flex items-start gap-2 justify-end'>
            <Image src={product.images[0]} width={120} height={50} alt='productImage' />
            <div className="w-[calc(100vh-122px)] h-fit mt-1">
              <Button className="w-fit h-fit bg-[#d9d9d9] text-black rounded  absolute right-0 text-center ">
                <Cancel01Icon 
                  onClick={() => handleRemove(product._id)} 
                  className='cursor-pointer w-3 h-3' 
                />
              </Button>
              <h1 className='text-slate-600 font-semibold text-lg'>{product.name}</h1>
              <h1 className='text-slate-500 font-mono text-lg'>{product.description}</h1>
                  <div className='flex gap-1'>

                  <DialogueBox  id={product._id} />
                  <DialogueQty id={product._id} />
                  </div>
              <div className="w-fit h-fit text-sm mt-1 text-slate-500 font-bold flex items-center gap-[0.5px]">
                {product.price}<IndianRupee width={20} height={15} />
              </div>
              <div className="w-full h-fit flex gap-1 items-center mt-1">
                <ArrowLeftRight className='w-4 h-4 text-slate-500' />
                <p className='text-sm font-mono text-slate-500'>30 day exchange</p>
              </div>
            </div>
          </Card>
        ))}
        <div className='grid place-content-center'>
          <Button className='bottom-0 w-[90vw] bg-black text-white rounded-xl' onClick={handleButtonClick}>
            Place Order
          </Button>
        </div>
      </div>
    </>
  );
}
