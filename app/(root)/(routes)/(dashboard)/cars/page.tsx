import React from 'react'

import prisma from "@/lib/prisma"
import BodyTypeClient from './[carId]/components/components/client'
const CarPage =async () => {
    const data = await prisma.car.findMany({
        include:{
            make:true,
            type:true,
            images:true
        }
    })

    const formattedTypes = data.map(car=>(
      {
        id:car.id,
        model:car.model,
        color:car.color,
        RegNo:car.regNo,
        rentalPrice:car.rentalPrice,
        availability:car.availability,
        make:car.make.name,
        HorsePower:car.HP,
        type:car.type.name,
        fuelType:car.fuelType,
        engineSize:car.engineSize,
        purchasePrice:car.price,
        YOM:car.year,
      }
    ))
  return (
    <div className=' flex flex-col'>
     <div className=' flex-1 p-5 space-y-4 pt-5'>
       <BodyTypeClient data={formattedTypes}/>
     </div>
    </div>
  )
}

export default CarPage