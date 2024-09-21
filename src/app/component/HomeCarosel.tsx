'use client'
import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

// Define an array of image URLs
const img = [
    "https://firebasestorage.googleapis.com/v0/b/ecommerce-963a9.appspot.com/o/images%2Felectric-blue-colour-hoodie-back-side-view--withou.jpg?alt=media&token=34551e77-0101-4231-8fa9-9eaaef7c8618",
    "https://firebasestorage.googleapis.com/v0/b/ecommerce-963a9.appspot.com/o/images%2Fgenerate-best-hoodie-with-best-back-ground-.jpg?alt=media&token=2da756f2-d99a-4c59-a522-bafc97ec142c"



    // Add more image URLs as needed
];

export default function HomeCarosel() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  React.useEffect(() => {
    // Ensure the plugin is initialized
    if (plugin.current) {
      plugin.current.reset();
    }
  }, []);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-[100vw] bg-slate-100"
      onMouseEnter={() => plugin.current?.stop()}
      onMouseLeave={() => plugin.current?.reset()}
    >
      <CarouselContent>
        {img.map((src, index) => (
          <CarouselItem key={index} className="w-[360px] h-[400px] relative"> {/* Ensure relative positioning */}
            <Card className="w-full h-full relative rounded-none">
              <Image
                src={src}
                layout='fill'
                alt={`carousel image ${index}`}
                className=' object-cover'
                priority // Optional: to prioritize image loading
              />
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
