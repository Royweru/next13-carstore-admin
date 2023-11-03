import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
export  async function POST(
    req:Request,
) {
    try {
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
            availability,
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
        if(!availability){
            return new NextResponse("Avalilaiblity is required!")
        }
        if(!color){
            return new NextResponse("color is required!")
        }
        if(!regNo){
            return new NextResponse("reg no is required")
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
               model,
               acceleration,
               availability,
               price,
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
    try {
        const car= await prisma.car.findMany()
        return NextResponse.json(car)
    } catch (error) {
        console.log('[CAR-GET]',error)
        return new NextResponse("Error",{status:500})
    }
}