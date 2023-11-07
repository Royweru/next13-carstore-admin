
import React from 'react'
import prisma from '@/lib/prisma'
import CarForm from './components/car-form'
const CarIdPage =async ({params}:{
    params:{carId:string}
}) => {
    const data =  await prisma.car.findUnique({
        where:{
            id:params.carId
        },
        include:{
            images:true
        }
    })
    const makes = await prisma.make.findMany()
    const bodyTypes = await prisma.type.findMany()
    const models = await prisma.model.findMany()
  return (
    <div className=' flex flex-col'>
      <div className=' flex-1 space-y-4 p-6'>
         <CarForm initialData={data} makes={makes} bodyTypes={bodyTypes} models={models}/>
      </div>
    </div>
  )
}

export default CarIdPage