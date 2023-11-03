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

interface MakeFormProps{
    initialData:Type|null
}

const formSchema = z.object({
    name:z.string().min(1),
    image:z.string().min(1),
})

type MakeFormValues = z.infer<typeof formSchema>
const MakeForm:React.FC<MakeFormProps> = ({
  initialData
}) => {
  const router = useRouter()
  const params = useParams()

  const form = useForm<MakeFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData||{
        name:"",
        image:""
    }
  })
const isLoading = form.formState.isSubmitting
const toastMessage = initialData?"Car Make successfully edited":"Car Make was successfully added"
const action = initialData?"Edit":"Add"
  const onSubmit =async (data:MakeFormValues)=>{
    try {
      if(initialData){
         await axios.patch(`/api/make/${params.makeId}`,data)
      }else{
        await axios.post('/api/make',data)
      }
      form.reset()
      router.refresh()
      router.push('/make')
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
        await axios.delete(`/api/make/${params.MakeId}`)
        router.refresh()
        router.push('/makes')
        toast({
          title:"Success",
          description:"Car Make deleted successfully!",
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
        <Heading title='This is the form to fill for the car body Make' desc='e.g Mercedes Benz'/>
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
                        <Input disabled={isLoading} placeholder='Car Make name..'  {...field}/>
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

export default MakeForm