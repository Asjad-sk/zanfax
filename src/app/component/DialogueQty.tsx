import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../redux/slices/cartSlice";

interface DialogueQtyProps {
  id: string;
}

export default function DialogueQty({ id }: DialogueQtyProps) {
  const item = useSelector((state: any) =>
    state.cart.items.find((item: any) => item._id === id)
  );
  const itemQuantity = item?.quantity || 1; 
  // Default to 1 if item doesn't exist
  console.log(itemQuantity)
  const dispatch = useDispatch();
  const [selectedQty, setSelectedQty] = useState<number>(itemQuantity);

  const handleQtyChange = (quantity: number) => {
    setSelectedQty(quantity);
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center bg-[#d9d9d9] text-black rounded p-[0.5rem] gap-1 ">
        <p className="text-sm">Qty {selectedQty}</p>
        <ChevronDown className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className=" bg-white">
        <div>
          <DialogHeader>
            <DialogTitle className="text-left my-4">Select Quantity</DialogTitle>
            <DialogDescription className="max-w-80 h-20 overflow-x-auto mt-4">
              <ScrollArea className="inline-flex gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                  <div
                    key={qty}
                    className={`w-8 h-8 border-2 border-slate-700 rounded-full mb-4 grid place-content-center cursor-pointer ${
                      selectedQty === qty ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => handleQtyChange(qty)}
                  >
                    {qty}
                  </div>
                ))}
              </ScrollArea>
            </DialogDescription>
          </DialogHeader>
          <DialogClose className="w-full mt-6 grid place-content-center">
            <Button className="w-60 bg-red-600 text-white text-center">Done</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
