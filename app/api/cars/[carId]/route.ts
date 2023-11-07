import prisma from '@/lib/prisma'

import {  NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'



export async function GET(
  {params}:{
    params:{carId:string}
  }
) {
  try {
    const user = await currentUser()
  if(!currentUser){
    return new NextResponse("Unauthorized",{status:403})
  }

  const car = await prisma.car.findUnique({
    where:{
      id:params.carId
    },
    include:{
      images:true,
      make:true,
      type:true
    }
  })
    return NextResponse.json(car)
  } catch (error) {
    console.log('[CAR_GET]',error)
    return new NextResponse("internal error!",{status:500})
  }
 
}


export async function PATCH(
 req:Request,
 {params}:{
    params:{carId:string}
 }
) {
    try {
        if(!params.carId){
            return new NextResponse("car id is required!")
          }
          const user = await currentUser()
        
          if(!user){
           return new NextResponse("You are not authorized!",{status:403})
          }
   
           const body = await req.json()
           const{
               makeId,
               typeId,
               model,
               year,
               color,
               regNo,
               rentalPrice,
               price,
               acceleration,
               isAvailable,
               isFeatured,
               location,
               mileage,
               engineSize,
               HP,
               fuelType,
               images
           } = body
   
   
   
           if(!images || images.length===0){
               return new NextResponse("Images are missing!",{status:400})
           }
           if(!makeId){
               return new NextResponse("make id is required!")
           }
           if(!typeId){
               return new NextResponse("type id is required!")
           }
           if(!mileage){
               return new NextResponse("mileage is required!")
           }
           if(!model){
               return new NextResponse("model of the car is required!")
           }
           if(!rentalPrice){
               return new NextResponse("rental price is required!")
           }
           if(!price){
               return new NextResponse("price is required!")
           }
           if(!engineSize){
               return new NextResponse("engine size is required!")
           }
           if(!HP){
               return new NextResponse("Horse power is required!")
           }
           if(!acceleration){
               return new NextResponse("Acceleration is required!")
           }
           if(!color){
               return new NextResponse("color is required!")
           }
           if(!location){
               return new NextResponse("location is required")
           }
           if(!fuelType){
               return new NextResponse("fuel type is required")
           }
           if(!year){
               return new NextResponse("year is required")
           }
        
          
          await prisma.car.update({
            where:{
              id:params.carId
            },
            data:{
            makeId,
            typeId,
            color,
            HP,
            mileage,
            acceleration,
            regNo,
            price,
            rentalPrice,
            images:{
              deleteMany:{}
            },
            engineSize,
            isAvailable,
            isFeatured,
            model,
            fuelType,
            year
            }
          })
          const car = await prisma.car.update({
            where:{
              id:params.carId
            },
            data:{
             images:{
              createMany:{
                data:[...images.map((image:{url:String})=>image)]
              }
             }
            }
          })
          return NextResponse.json(car)
    } catch (error) {
        console.log('[CAR-PATCH]',error)
        return new NextResponse("internal err",{status:500})
    }
    
}


export async function DELETE(
  req:Request,
  {params}:{
    params:{carId:string}
 }
) {
  try {
    if(!params.carId){
      return new NextResponse("car id is required!")
    }
    
    const car = await prisma.car.deleteMany({
      where:{
        id:params.carId
      }
    })

    return NextResponse.json(car)
  } catch (error) {
    console.log('CAR-DELETE',error)
    return new NextResponse("internal err",{status:500})
  }

}