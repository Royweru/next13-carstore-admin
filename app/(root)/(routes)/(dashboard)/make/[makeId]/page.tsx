
import React from 'react'
import prisma from '@/lib/prisma'
import MakeForm from './components/make-form'
const MakeIdPage =async ({params}:{
    params:{makeId:string}
}) => {
    const data =  await prisma.make.findUnique({
        where:{
            id:params.makeId
        }
    })
  return (
    <div className=' flex flex-col'>
      <div className=' flex-1 space-y-4 p-6'>
         <MakeForm initialData = {data} />
      </div>
    </div>
  )
}

export default MakeIdPage