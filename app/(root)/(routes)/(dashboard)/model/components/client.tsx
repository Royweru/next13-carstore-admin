'use client'
import React from 'react'

import {Type} from '@prisma/client'
import Heading from '@/components/heading'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { ModelColumn, columns } from './columns'
interface BodyTypeClientProps{
  data:ModelColumn[]
}
const BodyTypeClient:React.FC<BodyTypeClientProps> = ({
  data
}) => {
  const router = useRouter()
  return (
    <>
     <div className=' flex justify-between items-center w-full '>
        <Heading title={`Various car models (${data.length})`} desc='This are the various car models'/>
      <Button onClick={()=>router.push(`/model/new`)} className=' flex gap-x-4 items-center' variant="outline">
         <Plus size={15}/>
         Add new
      </Button>
     </div>
     <Separator/>
     <DataTable columns={columns} data={data} entry='name'/>
    </>
   
  )
}

export default BodyTypeClient