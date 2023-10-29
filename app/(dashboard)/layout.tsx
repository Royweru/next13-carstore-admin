import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
const RootLayout = (
   {children}:{
    children:React.ReactNode
   }
) => {

    if(!currentUser){
      return redirect('/sign-in')
    }
  return (
    <div className=' w-full h-full'>
        <Navbar />
        {children}
    </div>
  )
}

export default RootLayout