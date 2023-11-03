"use client"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CarColumn= {
  id: string
  model:string,
  color:string,
  RegNo:string,
  rentalPrice:string,
  availability:string,
  make:string,
  type:string,
  YOM:Date,
  HorsePower:string,
  engineSize:string,
  fuelType:string,
  purchasePrice:string
}

export const columns: ColumnDef<CarColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "src",
    header: "Image",
  
  },
  
]
