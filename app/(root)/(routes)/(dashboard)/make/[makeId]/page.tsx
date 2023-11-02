
import React from 'react'
import prisma from '@/lib/prisma'
import TypeForm from './components/type-form'
const TypeIdPage =async ({params}:{
    params:{typeId:string}
}) => {
    const data =  await prisma.type.findUnique({
        where:{
            id:params.typeId
        }
    })
  return (
    <div className=' flex flex-col'>
      <div className=' flex-1 space-y-4 p-6'>
         <TypeForm initialData = {data} />
      </div>
    </div>
  )
}

export default TypeIdPage