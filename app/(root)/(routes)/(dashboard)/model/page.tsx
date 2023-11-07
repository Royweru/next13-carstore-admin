import React from 'react'

import prisma from "@/lib/prisma"
import BodyTypeClient from './components/client'
const ModelPage =async () => {
    const data = await prisma.model.findMany({
        include:{
            make:true
        }
    })

    const formattedModels= data.map(model=>(
      {
        id:model.id,
        name:model.name,
        make:model.make.name
      }
    ))
  return (
    <div className=' flex flex-col'>
     <div className=' flex-1 p-5 space-y-4 pt-5'>
       <BodyTypeClient data={formattedModels}/>
     </div>
    </div>
  )
}

export default ModelPage