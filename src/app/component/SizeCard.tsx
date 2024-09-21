import { Card } from '@/components/ui/card'; 
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSize as updateCartSize } from '../redux/slices/cartSlice'; // Rename imported action

export default function SizeCard({id}) {
  const [size, setSelectedSize] = useState<string>("");
  const select = useSelector((state:any)=>state.cart.items.size)

  const sizes = ['S', 'M', 'L', 'XL', 'XXL']; // Define the sizes
  const dispatch = useDispatch();

  // Use effect to update size after it changes
  useEffect(() => {
    if (size) {
      dispatch(updateCartSize({ id, size })); 
      console.log(select)
    }

  }, [size, id, dispatch]); // This will run whenever `size` changes

  return (
    <Card className='h-fit w-[100vw]  flex flex-wrap gap-2 rounded-none border-none py-2  '>
      <p className='text-xl font-bold '>Size</p>
      <div className='flex w-full  gap-4'>
        {sizes.map((currentSize) => (
          <Card
            key={currentSize} // Add a unique key for each item
            className={`w-fit h-full px-3 py-2 font-semibold text-center text-xl rounded-xl cursor-pointer ${
              currentSize === size ? 'bg-gray-300' : 'bg-white'
            }`} // Highlight selected size
            onClick={() => {
              setSelectedSize(currentSize); // Update the selected size
            }}
          >
            {currentSize}
          </Card>
        ))}
      </div>
    </Card>
  );
}
