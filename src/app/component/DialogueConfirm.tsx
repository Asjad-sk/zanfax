import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import LoaderSign from "./Loader";

export function DialogConfirm({ productId }) {
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading state as false

  const handleCancelOrder = async () => {
    setLoading(true); // Start loading when the request is initiated
    try {
      console.log(productId);
      
      // Make the PUT request to the backend
      const res = await axios.put(`/api/cancelOrder/${productId}`);

      // Check if the response is OK
      if (res.status === 200) {
        console.log('Order cancelled:', res.data);
        toast.success("Order cancelled successfully");
      } else {
        console.error('Error cancelling order:', res.data.error);
        toast.error("Error while cancelling order");
      }
    } catch (error) {
      console.error('Request failed', error);
      toast.error('Error while cancelling order');
    } finally {
      setLoading(false); // Stop loading after the request is done
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black text-white rounded">Cancel Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Are you sure you want to cancel the order?
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-4">
            <LoaderSign /> {/* Show loader during cancellation */}
          </div>
        ) : (
          <DialogFooter>
            <Button type="submit" onClick={handleCancelOrder}>
              Yes
            </Button>
            <DialogClose asChild>
              <Button>No</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
