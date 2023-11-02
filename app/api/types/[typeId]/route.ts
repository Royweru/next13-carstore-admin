import prisma from '@/lib/prisma'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
 req:Request,
 {params}:{
    params:{typeId:string}
 }
) {
    try {
        if(!params.typeId){
            return new NextResponse("type id is required!")
          }
        
          const body  = await req.json()
        
          const{name,image}= body
        
          if(!name||!image){
            return new NextResponse("Image and name are required!")
          }
        
          const type = await prisma.type.updateMany({
            where:{
                id:params.typeId
            },
            data:{
                name,
                image
            }
          })
          return  NextResponse.json(type)
    } catch (error) {
        console.log('[TYPE-PATCH]',error)
        return new NextResponse("internal err",{status:500})
    }
    
}

export async function DELETE(
  req:Request,
  {params}:{
    params:{typeId:string}
 }
) {
  try {
    if(!params.typeId){
      return new NextResponse("type id is required!")
    }
    
    const type = await prisma.type.deleteMany({
      where:{
        id:params.typeId
      }
    })

    return NextResponse.json(type)
  } catch (error) {
    console.log('TYPE-DELETE',error)
    return new NextResponse("internal err",{status:500})
  }

}