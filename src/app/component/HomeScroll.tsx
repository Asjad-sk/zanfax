"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Loader } from "lucide-react";
import LoaderSign from "./Loader";

export function HomeScroll({ getCategory }: { getCategory: string }) {
  const [products, setProducts] = useState<{ id: string; image: string }[]>([]);
  const [category, setCategory] = useState<string>(getCategory); // Initialize category with getCategory
  const [loader,setLoader]=useState<boolean>(true)
  const router = useRouter();

  useEffect(() => {
    // Update category when getCategory changes
    setCategory(getCategory);
  }, [getCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/getProduct", {
          params: {
            category,
          },
      
        }
        
      );




        if (Array.isArray(response.data) && response.data.length > 0) {
          // Extract only the first image URL for each product
          const productImages = response.data
            .map((product: any) => {
              const firstImage = product.images && product.images.length > 0 ? product.images[0] : '';
              return {
                id: product._id,
                image: firstImage,
              };
            })
            .filter(product => product.image !== ''); // Filter out products with empty images

          setProducts(productImages);
          setLoader(false)
        } else {
          setProducts([]); // Clear products if no products found
          console.warn("No products found.");
        }
      } catch (error) {
        setProducts([]); // Clear products on error
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [category]); // Dependency on category

  const handleCardClick = (id: string) => {
    router.push(`/pages/getProduct/${id}`);
  };

  return (
    <>

    {
      loader ? (
        <>
        <LoaderSign/>
        </>
        
      ):(
        <ScrollArea className="w-[100vw] whitespace-nowrap  flex overflow-x-auto  rounded-none">
        <div className="flex gap-2">
          {products.length === 0 ? (
            <div className="w-full text-center">No products available</div>
          ) : (
            products.map(product => (
              <Card
                key={product.id}
                className="relative w-60 h-60 border-none cursor-pointer rounded-none"
                onClick={() => handleCardClick(product.id)}
              >
                {/* Container to maintain aspect ratio */}
                <div className="relative w-full h-full">
                  <Image 
                    src={product.image} 
                    layout="fill" 
                    objectFit="cover" 
                    alt="product" 
                  />
                </div>
              </Card>
            ))
          )}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      )
      
    }

    </>
  );
}
