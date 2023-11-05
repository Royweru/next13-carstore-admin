import React from 'react'

import prisma from "@/lib/prisma"
import MakeClient from '../../make/components/client'
import { Separator } from '@/components/ui/separator'
const MakePage =async () => {
    const data = await prisma.make.findMany()

    const formattedTypes = data.map(make=>(
      {
        id:make.id,
        name:make.name,
        label:make.image
      }
    ))
  return (
    <div className=' flex flex-col'>
     <div className=' flex-1 p-5 space-y-4 pt-5'>
       <MakeClient data={formattedTypes}/>
     </div>
    
    </div>
  )
}

export default MakePage