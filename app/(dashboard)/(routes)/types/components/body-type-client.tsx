import React from 'react'
import Heading from '@/components/heading';
import {Type} from '@prisma/client'
import { Separator } from '@/components/ui/separator';
interface BodyTypeClientProps{
    data:Type[];
}
const BodyTypeClient:React.FC<BodyTypeClientProps> = ({
    data
}) => {
  return (
    <>
    <div className=' flex justify-between items-center '>
     <Heading title=' various car body types' desc='Car body types below:' />
   
   </div>
   <Separator />
    </>
   

  )
}

export default BodyTypeClient