'use client'
import React from 'react'

import {Type} from '@prisma/client'
import Heading from '@/components/heading'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import { DataTable } from '@/components/data-table'
import { MakeColumn, columns } from './columns'
interface MakeProps{
  data:MakeColumn[]
}
const MakeClient:React.FC<MakeProps> = ({
  data
}) => {
  const router = useRouter()
  return (
    <>
     <div className=' flex justify-between items-center w-full '>
        <Heading title={`Various Car  Makes (${data.length})`} desc='This are the various car body types'/>
      <Button onClick={()=>router.push(`/types/new`)} className=' flex gap-x-4 items-center' variant="outline">
         <Plus size={15}/>
         Add new
      </Button>
     </div>
     <Separator/>
     <DataTable columns={columns} data={data} entry='name' />
    </>
   
  )
}

export default MakeClient