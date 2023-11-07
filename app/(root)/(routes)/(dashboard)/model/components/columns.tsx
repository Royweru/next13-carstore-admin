"use client"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ModelColumn= {
  id: string
  name:string
  make:string
}

export const columns: ColumnDef<ModelColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "make",
    header: "Under the Make:",
  },
]
