import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs"
export  async function POST(
    req:Request,
) {
    try {
        const user = await currentUser()
        
       if(!user){
        return new NextResponse("You are not authorized!")
       }

        const body = await req.json()
        const{
            makeId,
            typeId,
            modelId,
            transmission,
            drive,
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
        if(!modelId){
            return new NextResponse("model id of the car is required!")
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
        if(!transmission){
            return new NextResponse("transmission is required!")
        }
        if(!drive){
            return new NextResponse("drive is required!")
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
        const car= await prisma.car.create({
            data:{
               makeId,
               typeId,
               images:{
                createMany:{
                    data:  [...images.map((image:{url:string})=>image)]
                },
               },
               location,
               fuelType,
               mileage,
               engineSize,
               modelId,
               acceleration,
               isAvailable,
               isFeatured,
               price,
               transmission,
               drive,
               rentalPrice,
               regNo,
               HP,
               year,
               color
            }
        })
        return NextResponse.json(car)
    } catch (error) {
        console.log('[CAR-POST]',error)
        return new NextResponse("Error",{status:500})
    }
}
export  async function GET(
    req:Request,
) {
    const {searchParams} = new URL(req.url)
    const modelId = searchParams.get("modelId")||undefined
    const typeId = searchParams.get("typeId")||undefined
    const makeId = searchParams.get("makeId")||undefined
    const yearOfManufacture = searchParams.get("YOM")||undefined
    const color = searchParams.get("color")||undefined
    const isFeatured = searchParams.get("isFeatured")
    try {
        const car= await prisma.car.findMany({
            where:{
                modelId,
                typeId,
                makeId,
                year:yearOfManufacture,
                color,
                isFeatured:isFeatured?true:undefined,
                isAvailable:true
            },
            include:{
                images:true,
                type:true,
                make:true,
                model:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return NextResponse.json(car)
    } catch (error) {
        console.log('[CAR-GET]',error)
        return new NextResponse("Error",{status:500})
    }
}