'use client'
import Header from './component/Header'
import React from 'react'
import HomeCarosel from './component/HomeCarosel'
import { HomeScroll } from './component/HomeScroll'
import { useSession } from 'next-auth/react'


export default function page() {



  return (
    <>
    <Header/>
    <HomeCarosel/>
    <h1 className=' font-bold  text-xl ml-2  text-slate-500 mt-10'>Polo</h1>
    <HomeScroll getCategory ={"Polo"} />
    <h1 className=' font-bold ml-2  text-xl  text-slate-500 mt-10'>Sweat Shirt</h1>
    <HomeScroll getCategory={"Sweat-Shirt"} />
    <h1 className=' font-bold ml-2 text-xl  text-slate-500 mt-10'>Hoodie</h1>
    <HomeScroll getCategory={"Hoodies"}/>
 

    </>
  )
}







 