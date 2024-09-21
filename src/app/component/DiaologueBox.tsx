import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ChevronDown, ChevronDownIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateSize } from "../redux/slices/cartSlice";

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

interface DialogueBoxProps {
  id: string;
  onSelectSize?: (size: string) => void; // Callback to handle size selection
}

export default function DialogueBox({ id }: DialogueBoxProps) {
  const item = useSelector((state: any) =>
    state.cart.items.find((item: any) => item._id === id)
  );
  const itemSize = item?.size || ""; 
  console.log( itemSize );
  const [size, setSize] = useState<string>(itemSize);
  const dispatch = useDispatch();
  
  const handleSizeChange = () => {
    if (size) {
      dispatch(updateSize({ id, size }));

    }
  };

  return (
    <Dialog >
      {/* Ensure only one child for DialogTrigger */}
      <DialogTrigger className="flex items-center bg-[#d9d9d9] text-black rounded p-[0.5rem] gap-1 ">
        <p className="text-sm">Size {size}</p>
        <ChevronDown className="w-4 h-4" />
      </DialogTrigger>          
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-left my-4">Select Size</DialogTitle>
          <DialogDescription className="flex flex-wrap justify-between mt-4">
            {sizes.map((currentSize) => (
              <div
                key={currentSize}
                className={`border border-gray-500 rounded-full w-8 h-8 flex items-center justify-center text-center cursor-pointer p-1 ${size === currentSize ? 'border-2 border-red-400 text-red-600 font-semibold text-xl' : ''}`}
                onClick={() => setSize(currentSize)} // Update state on click
              >
                {currentSize}
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          {/* Ensure only one child for DialogClose */}
          <Button className="w-full mt-6 bg-red-600" onClick={handleSizeChange}>
            Done
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
