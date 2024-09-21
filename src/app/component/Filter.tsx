import { Card } from '@/components/ui/card'
import { ArrowUpDown, ListFilter } from 'lucide-react'
import { ArrowDownUp } from 'lucide-react'
import React from 'react'

export default function Filter() {
  return (
    <div>
        <Card className='w-full h-fit p-2 flex items-center gap-4 mt-1   rounded-none   '>
            <Card className='p-1 rounded-sm bg-slate-100 flex gap-1 text-sm'>
                <ListFilter className='text-slate-500 font-mono w-4 h-4 '/><p className=' text-slate-500 font-mono text-sm'>filter</p>
            </Card>
            <Card className='p-1 rounded-sm bg-slate-100 flex gap-2 text-sm   '>
                <p className=' text-slate-500 font-mono inline-flex gap-1'><ArrowDownUp className='w-4 h-4 '/>low to high</p>
            </Card>
            <Card className='p-1 rounded-sm bg-slate-100 flex gap-2 text-sm'>
                <p className=' text-slate-500 font-mono inline-flex gap-1 text-sm  '><ArrowUpDown className='w-4 h-4 '/>high to low</p>
            </Card>



        </Card>
      
    </div>
  )
}
