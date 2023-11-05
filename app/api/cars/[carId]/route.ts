import prisma from '@/lib/prisma'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
 req:Request,
 {params}:{
    params:{makeId:string}
 }
) {
    try {
        if(!params.makeId){
            return new NextResponse("make id is required!")
          }
        
          const body  = await req.json()
        
          const{name,image}= body
        
          if(!name||!image){
            return new NextResponse("Image and name are required!")
          }
        
          const make = await prisma.make.updateMany({
            where:{
                id:params.makeId
            },
            data:{
                name,
                image
            }
          })
          return  NextResponse.json(make)
    } catch (error) {
        console.log('[TYPE-PATCH]',error)
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