"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CarColumn= {
  id: string
  model:string,
  engineSize:string, 
  purchasePrice:number,
  rentalPrice:number,
  fuelType:string,
  make:string,
  type:string,
  color:string,
  HorsePower:number,
  availability:boolean,
  featured:boolean,
  YOM:string,
  mileage:number
}

export const columns: ColumnDef<CarColumn>[] = [
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "type",
    header: "Body Type",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "HorsePower",
    header: "HorsePower",
  },
  {
    accessorKey: "availability",
    header: "Available",
  },
  {
    accessorKey: "featured",
    header: "Featured",
  },
  {
    accessorKey: "fuelType",
    header: "FuelType",
  },
  {
    accessorKey: "purchasePrice",
    header: "PurchasePrice",
  },
  {
    accessorKey: "rentalPrice",
    header: "RentalPrice",
  },
  {
    accessorKey: "YOM",
    header: "Year of manufacture",
  },
  {
    accessorKey: "engineSize",
    header: "EngineSize",
  },
]
