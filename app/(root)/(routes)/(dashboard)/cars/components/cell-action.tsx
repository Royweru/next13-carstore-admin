"use client"
import React from "react";
import { CarColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

import { useRouter,useParams } from "next/navigation";
interface CellActionProps {
  data: CarColumn;
}
const CellAction: React.FC<CellActionProps> = ({ data }) => {

    
    const router = useRouter()
  const onDelete = () => {

  };

  const onCopy=()=>{
    navigator.clipboard.writeText(data.id)
    toast({
        title:"Success",
        description:"Id copied to clipboard successfully"
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost">
            <span className=" sr-only">open menu</span>
            <MoreHorizontal className=" h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopy}>
            Copy
            <Copy className=" h-4 w-4 ml-2" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Delete
            <Trash className=" h-4 w-4 ml-2" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>router.push(`/cars/${data.id}`)}>
            Edit
            <Pencil className=" h-4 w-4 ml-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
