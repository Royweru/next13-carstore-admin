import React from 'react'

import {Type} from '@prisma/client'
import Heading from '@/components/heading'
import { Separator } from '@/components/ui/separator'
interface BodyTypeClientProps{
  data:Type[]
}
const BodyTypeClient:React.FC<BodyTypeClientProps> = ({
  data
}) => {

  return (
    <>
     <div className=' flex justify-between items-center w-full '>
        <Heading title={`Various car body types (${data.length})`} desc='This are the various car body types'/>
        
     </div>
     <Separator/>
    </>
   
  )
}

export default BodyTypeClient