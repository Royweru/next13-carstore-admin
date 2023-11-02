"use client"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TypeColumn= {
  id: string
  name:string
  src:string
}

export const columns: ColumnDef<TypeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "src",
    header: "Image",
  
  },
  
]
