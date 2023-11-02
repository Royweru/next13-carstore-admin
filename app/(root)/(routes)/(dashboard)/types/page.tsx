import React from 'react'

import prisma from "@/lib/prisma"
import BodyTypeClient from './components/client'
const BodyTypePage =async () => {
    const data = await prisma.type.findMany()

    const formattedTypes = data.map(type=>(
      {
        id:type.id,
        name:type.name,
        src:type.image
      }
    ))
  return (
    <div className=' flex flex-col'>
     <div className=' flex-1 p-5 space-y-4 pt-5'>
       <BodyTypeClient data={formattedTypes}/>
     </div>
    </div>
  )
}

export default BodyTypePage