import { Card } from '@/components/ui/card'
import { IndianRupee } from 'lucide-react'
import React from 'react'

export default function PriceCard({price,title}) {
  return (
    <Card className='bg-slate-100 flex justify-between p-2'>
        <h3 className='text-xl font-extrabold text-slate-600 '>{title}</h3>
        <div className='flex '>

        <p className=' inline-flex justify-center items-center  gap-[1px] font-bold '>
          <IndianRupee className='w-5 h-[17px] text-slate-800' /> 
          <p className='text-xl text-slate-800'>
          {price}
           </p>
        </p>
        </div>
  

  
    </Card>
  )
}
