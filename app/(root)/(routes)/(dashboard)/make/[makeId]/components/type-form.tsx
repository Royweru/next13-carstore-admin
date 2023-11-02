'use client'
import React from 'react'
import{Type} from "@prisma/client"

import{useParams,useRouter} from 'next/navigation'
import Heading from '@/components/heading'
import * as z from 'zod'
import { Separator } from '@/components/ui/separator'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from '@/components/image-upload'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

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
  const router = useRouter()
  const params = useParams()

  const form = useForm<TypeFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData||{
        name:"",
        image:""
    }
  })
const isLoading = form.formState.isSubmitting
const toastMessage = initialData?"Body type successfully edited":"Body type was successfully added"
const action = initialData?"Edit":"Add"
  const onSubmit =async (data:TypeFormValues)=>{
    try {
      if(initialData){
         await axios.patch(`/api/types/${params.typeId}`,data)
      }else{
        await axios.post('/api/types',data)
      }
      form.reset()
      router.refresh()
      router.push('/types')
      toast({
        title:"Success!",
        description:toastMessage
      })
    } catch (error) {
      console.error('Err:',error)
      toast({
        title:"Error",
        description:"Something went wrong",
        variant:"destructive"
      })
    }
  }
  const onDelete = async()=>{
     try {
        await axios.delete(`/api/types/${params.typeId}`)
        router.refresh()
        router.push('/types')
        toast({
          title:"Success",
          description:"Body type deleted successfully!",
          duration:4000
        })
     } catch (error) {
       toast({
        title:"Error",
        description:"something went wrong while trying to delete!",
        variant:"destructive"
       })
     }
  }
  return (
    <>

    <div className=' flex justify-between items-center'>
        <Heading title='This is the form to fill for the car body type' desc='e.g sedan'/>
       {initialData&&(
        <Button onClick={onDelete} variant="destructive">
          <Trash  className=' w-4 h-4'/>
        </Button>
       )}
    </div>
    <Separator />
   <Form {...form}>
     <form
       onSubmit={form.handleSubmit(onSubmit)}
       className=' w-full space-y-8 '>
        <div className=' w-full'>
        <FormField
              name='image'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Image:
                    </FormLabel>
                    <FormControl>
                       <ImageUpload 
                         value={field.value ? [field.value] : []}
                         disabled={isLoading}
                         onChange={(url) => field.onChange(url)}
                         onRemove={() => field.onChange("")}
                       />
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
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
                        <Input disabled={isLoading} placeholder='Body type name..'  {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div className=' w-full flex justify-center items-center mt-3'>
         <Button variant="secondary" type='submit' disabled={isLoading}>
           {action}
         </Button>
        </div>
       </form>
   </Form>
    </>
    
  )
}

export default TypeForm