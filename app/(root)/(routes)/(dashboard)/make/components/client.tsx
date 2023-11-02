'use client'
import React from 'react'

import {Type} from '@prisma/client'
import Heading from '@/components/heading'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
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
      <Button onClick={()=>router.push(`/types/new`)} className=' flex gap-x-4 items-center' variant="outline">
         <Plus size={15}/>
         Add new
      </Button>
     </div>

     <Separator/>
    </>
   
  )
}

export default BodyTypeClient