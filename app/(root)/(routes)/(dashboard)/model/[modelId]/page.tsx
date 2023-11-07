
import React from 'react'
import prisma from '@/lib/prisma'
import ModelForm from './components/model-form'
const ModelIdPage =async ({params}:{
    params:{modelId:string}
}) => {
    const data =  await prisma.model.findUnique({
        where:{
            id:params.modelId
        }
    })
    const makes = await prisma.make.findMany()
  return (
    <div className=' flex flex-col'>
      <div className=' flex-1 space-y-4 p-6'>
         <ModelForm initialData = {data} makes={makes}/>
      </div>
    </div>
  )
}

export default ModelIdPage