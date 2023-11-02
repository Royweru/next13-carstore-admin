import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
export  async function POST(
    req:Request,
) {
    try {
        const body = await req.json()
        const{name,image} = body

        if(!name||!image){
            return new NextResponse("Name and ImageUrl are required")
        }
        const Type = await prisma.type.create({
            data:{
                name:name,
                image:image,
            }
        })
        return NextResponse.json(Type)
    } catch (error) {
        console.log('[TYPE-POST]',error)
        return new NextResponse("Error",{status:500})
    }
}