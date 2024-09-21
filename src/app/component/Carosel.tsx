"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { StarCircleIcon, StarIcon } from "hugeicons-react";
interface CaroselProps {
  img: string[];

}

export default function Carosel({ img }: CaroselProps) {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  React.useEffect(() => {
    // Ensure the plugin is initialized
    plugin.current && plugin.current.reset();
  }, []);

  return (
      <Carousel
        plugins={[plugin.current]}
        className="w-full "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="flex h-fit">
          {img.map((src, index) => (
            <CarouselItem key={index} className="w-full h-[400px] relative"> 
              <Card className="w-full h-full rounded-none">
                <Image 
                  src={src} 
                  fill
                  alt={`carousel image ${index}`} 
                  className="object-cover"
                  priority // Optional: to prioritize image loading
                />
              </Card>
            </CarouselItem>
          ))}
          
        </CarouselContent>
          <div className="absolute right-0 text-md font-semibold bg-stone-50 top-1 py-1 px-3 rounded  flex items-center gap-1  text-slate-600  ">
            4.5 <Star className="w-4 h-4"/>
          </div>
        
      </Carousel>
  );
}
