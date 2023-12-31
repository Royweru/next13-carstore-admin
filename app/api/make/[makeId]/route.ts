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
    params:{makeId:string}
 }
) {
  try {
    if(!params.makeId){
      return new NextResponse("make id is required!")
    }
    
    const make = await prisma.make.deleteMany({
      where:{
        id:params.makeId
      }
    })

    return NextResponse.json(make)
  } catch (error) {
    console.log('MAKE-DELETE',error)
    return new NextResponse("internal err",{status:500})
  }

}