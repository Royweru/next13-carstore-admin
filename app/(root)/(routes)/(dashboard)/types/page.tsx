import React from 'react'

import prisma from "@/lib/prisma"
import MakeClient from './components/client'
const MakePage =async () => {
    const data = await prisma.type.findMany()
  return (
    <div className=' flex flex-col'>
     <div className=' flex-1 p-5 space-y-4 pt-5'>
       <MakeClient data={data}/>
     </div>
    </div>
  )
}

export default MakePage