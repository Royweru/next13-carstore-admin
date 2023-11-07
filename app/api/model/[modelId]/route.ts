import prisma from '@/lib/prisma'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
 req:Request,
 {params}:{
    params:{modelId:string}
 }
) {
    try {
        if(!params.modelId){
            return new NextResponse("model id is required!")
          }
        
          const body  = await req.json()
        
          const{name,makeId}= body
        
          if(!name||!makeId){
            return new NextResponse("Image and name are required!")
          }
        
          const model = await prisma.model.updateMany({
            where:{
                id:params.modelId
            },
            data:{
                name,
                makeId
            }
          })
          return  NextResponse.json(model)
    } catch (error) {
        console.log('[MODEL-PATCH]',error)
        return new NextResponse("internal err",{status:500})
    }
    
}

export async function DELETE(
  req:Request,
  {params}:{
    params:{modelId:string}
 }
) {
  try {
    if(!params.modelId){
      return new NextResponse("model id is required!")
    }
    
    const model = await prisma.model.deleteMany({
      where:{
        id:params.modelId
      }
    })

    return NextResponse.json(model)
  } catch (error) {
    console.log('MODEL-DELETE',error)
    return new NextResponse("internal err",{status:500})
  }

}