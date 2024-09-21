import Image from 'next/image'
import React, { useState, useEffect } from 'react'

export default function LoaderSign() {
  const [scale, setScale] = useState(1);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const scaleIntervalId = setInterval(() => {
      setScale(prevScale => (prevScale === 1 ? 1.2 : 1));
      setActiveDot(prevDot => (prevDot + 1) % 4); // Cycle through dot indices

    }, 300); // Pulsing scale effect


    return () => {
      clearInterval(scaleIntervalId);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/ecommerce-963a9.appspot.com/o/images%2FScreenshot%202024-08-29%20212915.png?alt=media&token=e3ed21de-715c-44f6-ba53-05e69a1b7f36"
        alt="Description of image"
        width={145} // Set a reasonable width
        height={110} // Set a reasonable height
        style={{ transform: `scale(${scale})`, transition: 'transform 0.5s' }}
      />

      <div className='flex gap-4 mt-4'>
        {[0, 1, 2, 3].map(index => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full bg-slate-500 border-2 transition-transform duration-400 ${activeDot === index ? 'transform scale-150' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  )
}
