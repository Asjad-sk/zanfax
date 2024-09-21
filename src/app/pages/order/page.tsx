"use client";
import React, { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSession } from "next-auth/react";
import { setUser } from "@/app/redux/slices/userSlice";
import { toast } from "sonner";

type FormData = {
  address: string;
  city: string;
  pincode: string;
  landmark?: string;
  country: string;
  phoneNumber: string;
};

type InputType = "text" | "number";

export default function Page() {
  const [userid, setUserid] = useState<string>(""); // Renamed setuserid to setUserid for consistency
  const dispatch = useDispatch();
  const orderData = useSelector((state: any) => state.order);

  // Safely map over products if they exist
  const modifiedOrders = orderData?.products?.map((item: any) => ({
    product: item._id,
    imageUrl: item.images[0],
    quantity: item.quantity,
    price: item.price,
    size: item.size,
    status: "pending",
  })) || [];

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          console.log(session.user.id); // Ensure this exists in session
          console.log(session.user.email);

          // Update the userid state
          setUserid(session.user.id || ""); // Ensure this value is set

          // Dispatch user info to Redux store
          dispatch(
            setUser({
              userid: session.user.id || "",
              email: session.user.email || "",
              firstName: session.user.name || "",
              profilepicture: session.user.image || "",
              phoneNumber: "", // Default value or fetched from the API
              isAdmin: false, // Default value or fetched from the API
              createdAt: new Date(), // Default value or fetched from the API
              loading: false,
              error: null,
            })
          );
          
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  const form = useForm<FormData>({
    defaultValues: {
      address: orderData?.shippingAddress?.address || "",
      city: orderData?.shippingAddress?.city || "",
      pincode: orderData?.shippingAddress?.pincode || "",
      landmark: orderData?.shippingAddress?.landmark || "",
      country: orderData?.shippingAddress?.country || "",
      phoneNumber: orderData?.phoneNumber || "",
    },
  });

  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    try {
      const orderPayload = {
        user: userid, // Ensure this is set from useEffect
        products: modifiedOrders,
        totalAmount: orderData.totalAmount, // Ensure this value is correct
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          landmark: formData.landmark || "",
          country: formData.country,
        },
        phoneNumber: formData.phoneNumber.toString(),
      };

      const response = await axios.post("/api/addOrder", orderPayload);
      router.replace(`/pages/confirmOrder/${response.data._id}`);
      toast.success("Order added successfully")
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to add order")
    }
  };

  const formInput = (name: keyof FormData, placeholder: string, type: InputType) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{placeholder}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} className="rounded" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center rounded-xl gap-4">
      <div>
        <h1>Add Your Address</h1>
      </div>
      <Card className="w-[85%] flex justify-center gap-2">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 p-4">
            {formInput("address", "Address", "text")}
            {formInput("city", "City", "text")}
            {formInput("pincode", "Pincode", "text")}
            {formInput("landmark", "Landmark", "text")}
            {formInput("country", "Country", "text")}
            {formInput("phoneNumber", "Phone Number", "text")}
            <Button className="w-full border-2 border-black my-2 rounded-xl bg-black text-white">
              Submit
            </Button>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
