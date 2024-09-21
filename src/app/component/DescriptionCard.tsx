import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRightLeft, ArrowRightToLine, BadgeIndianRupeeIcon, Car, CircleDollarSign, IndianRupee, IndianRupeeIcon, ReceiptIndianRupee, Truck } from 'lucide-react'
import { TruckIcon } from 'lucide-react'
import React from 'react'

export default function DescriptionCard({description}:{
  description:string
}) {
  return (

    <>
    <div className='w-[100vw] h-fit py-2  '>
      <Card className='border-none'>
        <h1 className='text-md text-slate-600 font-mono py-1 '>
          {description}
        </h1>

      </Card>

    </div>
    </>
     
  )
}
 