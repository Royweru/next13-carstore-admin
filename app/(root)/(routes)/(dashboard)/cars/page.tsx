import React from 'react'

import prisma from "@/lib/prisma"
import CarClient from './components/client'

const CarPage =async () => {
    const data = await prisma.car.findMany({
        include:{
            make:true,
            type:true,
            images:true,
            model:true
        }
    })

    const formattedTypes = data.map(car=>(
      {
        id:car.id,
        model:car.model.name,
        make:car.make.name,
        type:car.type.name,
        color:car.color,
        HorsePower:car.HP,
        availability:car.isAvailable,
        featured:car.isFeatured,
        YOM:car.year,
        purchasePrice:car.price.toNumber(),
        rentalPrice:car.rentalPrice.toNumber(),
        mileage:car.mileage,
        fuelType:car.fuelType,
        engineSize:car. engineSize
      }
    ))
  return (
    <div className=' flex flex-col'>
     <div className=' flex-1 p-5 space-y-4 pt-5'>
       <CarClient data={formattedTypes}/>
     </div>
    </div>
  )
}

export default CarPage