"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '@/app/component/Header';
import Carosel from '@/app/component/Carosel';
import { useDispatch } from 'react-redux';
import { addItem } from '@/app/redux/slices/cartSlice';
import DescriptionCard from '@/app/component/DescriptionCard';
import { HomeScroll } from '@/app/component/HomeScroll';
import DialogueBox from '@/app/component/DiaologueBox';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import LoaderSign from '@/app/component/Loader';
import PriceCard from '@/app/component/PriceCard';
import SizeCard from '@/app/component/SizeCard';


function ProductPage() {
  const { id } = useParams(); // Get the ID from the URL
  const [price, setPrice] = useState<number>(0);
  const [productUrl, setProductUrl] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [addProduct, setAddProduct] = useState<any>(null); // Changed to `any` to allow for the data object
  const dispatch = useDispatch();
  // const toast = useToast();
  // Ensure `id` is a string
  const productId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/getProductbyId/${productId}`);
        const data = response.data;
        
        // Update state with product details
        setProductUrl(data.images);
        setPrice(data.price);
        setTitle(data.name); // Ensure consistency
        setDescription(data.description);
        
        setAddProduct({
          ...data,
          quantity: 1
        });
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching product:', err.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) return <p>{error}</p>;
  if (!productUrl.length) return (
    <>
    <div className='w-[100vw] h-[100vh]'>

    <LoaderSign/>
    </div>
    </>
  );

  return (
    <>

      <Header/>
     <Carosel img={productUrl}  />
      <PriceCard price={price} title={title} />
      <SizeCard id={productId}/>
      <HomeScroll getCategory={addProduct?.category || ''} />
      <DescriptionCard description={description} />
      <div className='grid place-content-center'>
        <Button 
          onClick={
           () => { 
            dispatch(addItem(addProduct));
              toast.success("product added successfully")
            } 
          } 
          className='w-[100vw] h-fit py-2 border-black bg-black text-white  grid place-content-center fixed bottom-0'>
          Add to Cart
        </Button>
      </div>
    </>
  );
}

export default ProductPage;
