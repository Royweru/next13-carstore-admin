'use client'
import React from 'react'

import {Type} from '@prisma/client'
import Heading from '@/components/heading'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
interface BodyTypeClientProps{
  data:Type[]
}
const BodyTypeClient:React.FC<BodyTypeClientProps> = ({
  data
}) => {
  const router = useRouter()
  return (
    <>
     <div className=' flex justify-between items-center w-full '>
        <Heading title={`Various car body types (${data.length})`} desc='This are the various car body types'/>
       <div onClick={()=>router.push(`types/new`)}>
         AddNew
        </div> 
     </div>

     <Separator/>
    </>
   
  )
}

export default BodyTypeClient