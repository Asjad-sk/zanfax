"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'; // Use useRouter from 'next/navigation' for Next.js
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import {  IndianRupee } from 'lucide-react';
import Header from '@/app/component/Header';
import order from '@/app/models/order';
import LoaderSign from '@/app/component/Loader';

interface Product {
  imageUrl: string;
  price:number;
  quantity:number;
  size:string
  _id:string
}


interface shippingAddress{
  address:string,
  city:string,
  country:string,
  landmark:string,
  pincode:string
}

interface OrderDetails {
  user:string
  products: Product[];
  shippingAddress:shippingAddress
  status:string
  totalAmount:number
  phoneNumber:number

}

export default function Page() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {id} =  useParams()
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`/api/getOrder/${id}`);
          setOrderDetails(response.data);
        }
      } catch (err) {
        // setError('Failed to fetch order details');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);
  return (
    <div>
      {loading && (
        <>
          <div className='w-[100vw] h-[100vh]'>
            <LoaderSign/>
          </div>
        </>
      )}
      {error && <p>{error}</p>}   
      {orderDetails && (
        <div className='w-screen h-fit flex flex-col justify-center items-center gap-2'>
          <Header />
          <h1 className='text-2xl font-bold text-slate-500 p-2 '>Product Details</h1>

          <Card className='w-fit h-fit border-none    '>
            {orderDetails.products.map((product, index) => (
              <Card key={index}  className=' w-[100vw] p-2 flex rounded-none' onClick={() => {
                router.replace(`/pages/getProuduct/${product._id}`)
              }
              }>
                <Image src={product.imageUrl} width={100} height={100} alt='product' />
                <Card className='flex flex-col gap-1 px-2 rounded-none w-full '>
                  <p className='flex gap-2 items-center  '>

                    <IndianRupee className='w-4 h-4'/> {product.price}
                  </p>
                  <p className='flex gap-2 items-center  '>

                    quantity: {product.quantity}
                  </p>
                <p className='font-semibold'>
                  Size:{product.size}
                </p>
                </Card>
             
              </Card>

            ))}
            <Card className='border-none p-3'>

              <p className='text-md text-slate-600 font-semibold px-2 flex items-center gap-[1px] '><span className='text-lg '>totalAmount : </span>{orderDetails.totalAmount}<IndianRupee className='w-4 h-4'/></p>
            </Card>
          </Card>
          <h1 className='text-2xl font-bold text-slate-500 p-2 '>address detail</h1>

          <div className='w-screen'>
          <Card className='w-full rounded-none border-none px-4 flex flex-col gap-4 p-4  '>
              <p className='text-lg text-slate-600  '><span className='text-xl font-bold'>Address:</span>{orderDetails.shippingAddress.address}</p>
              <p className='text-lg text-slate-600  '><span className='text-xl font-bold'>City:</span>{orderDetails.shippingAddress.city}</p>
              <p className='text-lg text-slate-600  '><span className='text-xl font-bold'>Landmark:</span>{orderDetails.shippingAddress.landmark}</p>
              <p className='text-lg text-slate-600  '><span className='text-xl font-bold'>pincode:</span>{orderDetails.shippingAddress.pincode}</p>
              <p className='text-lg text-slate-600  '><span className='text-xl font-bold'>Mobile no:</span>{orderDetails.phoneNumber}</p>
            </Card>
            <Card className= 'absolute bottom-0 w-[100vw] py-4 mt-4 grid place-content-center rounded-none border-none '>
              <p className='text-xl text-center font-semibold text-green-600'> Order Successfull </p>
              <p className='text-sm font-medium text-slate-600'>very soon we deliver your product</p>
            </Card>
          </div>
           
        </div>
      )}
    </div>
  );
}
