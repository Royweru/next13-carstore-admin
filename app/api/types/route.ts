import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
export  async function POST(
    req:Request,
) {
    try {
        const user = await currentUser()
        if(!user){
            redirect('/sign-in')
        }
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

export  async function GET(
    req:Request,
) {
    try {
        const type= await prisma.type.findMany()
        return NextResponse.json(type)
    } catch (error) {
        console.log('[TYPE-GET]',error)
        return new NextResponse("Error",{status:500})
    }
}