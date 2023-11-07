import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
export  async function POST(
    req:Request,
) {
    try {
        const body = await req.json()
        const{name,makeId} = body

        if(!name||!makeId){
            return new NextResponse("Name and make Id are required")
        }
        const model = await prisma.model.create({
            data:{
                name:name,
                makeId
            }
        })
        return NextResponse.json(model)
    } catch (error) {
        console.log('[MODEL-POST]',error)
        return new NextResponse("Error",{status:500})
    }
}