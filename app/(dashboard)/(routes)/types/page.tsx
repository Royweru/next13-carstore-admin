import React from 'react'
import axios from 'axios'
import prisma from "@/lib/prisma"
import BodyTypeClient from './components/body-type-client'
const BodyTypePage =async () => {
    const data = await prisma.type.findMany()
  return (
    <div className=' flex flex-col'>
     <div className=' flex-1 p-5 space-y-4 '>
       <BodyTypeClient data={data}/>
     </div>
    </div>
  )
}

export default BodyTypePage