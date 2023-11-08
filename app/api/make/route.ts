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
        const Make= await prisma.make.create({
            data:{
                name:name,
                image:image,
            }
        })
        return NextResponse.json(Make)
    } catch (error) {
        console.log('[MAKE-POST]',error)
        return new NextResponse("Error",{status:500})
    }
}
export  async function GET(
    req:Request,
) {
    try {
        const Make= await prisma.make.findMany({
            include:{
                models:true
            }
        })
        return NextResponse.json(Make)
    } catch (error) {
        console.log('[MAKE-GET]',error)
        return new NextResponse("Error",{status:500})
    }
}