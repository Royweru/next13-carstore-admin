'use client'
import React from 'react'

import {Type} from '@prisma/client'
import Heading from '@/components/heading'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { CarColumn, columns } from './columns'
import { MakeColumn } from '../../make/components/columns'
interface CarClientProps{
  data:CarColumn[],
  

}
const CarClient:React.FC<CarClientProps> = ({
  data
}) => {
  const router = useRouter()
  return (
    <>
     <div className=' flex justify-between items-center w-full '>
        <Heading title={`Cars avilable (${data.length})`} desc='This are the various cars available'/>
      <Button onClick={()=>router.push(`/cars/new`)} className=' flex gap-x-4 items-center' variant="outline">
         <Plus size={15}/>
         Add new
      </Button>
     </div>
     <Separator/>
     <DataTable columns={columns} data={data} entry='model'/>
    </>
   
  )
}

export default CarClient