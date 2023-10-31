'use client'
import React from 'react'
import{Type} from "@prisma/client"

import{usePathname,useRouter} from 'next/navigation'
import Heading from '@/components/heading'
import * as z from 'zod'
import { Separator } from '@/components/ui/separator'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface TypeFormProps{
    initialData:Type|null
}

const formSchema = z.object({
    name:z.string().min(1),
    image:z.string().min(1),
})

type TypeFormValues = z.infer<typeof formSchema>
const TypeForm:React.FC<TypeFormProps> = ({
  initialData
}) => {
  const form = useForm<TypeFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData||{
        name:"",
        image:""
    }
  })

  const onSubmit = ()=>{

  }
  return (
    <>

    <div className=' flex justify-between items-center'>
        <Heading title='This is the form to fill for the car body type' desc='e.g sedan'/>
        <div className=' text-xl'>
            DELETE BUTTON
        </div>
    </div>
    <Separator />
   <Form {...form}>
     <form
       onSubmit={form.handleSubmit(onSubmit)}
       className=' w-full space-y-8 '>
        <div className=' w-full'>
          
        </div>
        <div className=' grid grid-cols-3 gap-8 '>
            <FormField
              name='name'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Name:
                    </FormLabel>
                    <FormControl>
                        <Input />
                    </FormControl>
                </FormItem>
              )}
            />

            
        </div>
       </form>
   </Form>
    </>
    
  )
}

export default TypeForm