'use client'
import React from 'react'
import{Car, Image as ImageType, Make, Type} from "@prisma/client"

import Image from 'next/image'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


interface CarFormProps{
    initialData:Car&{
      images:ImageType[]
    }|null,
    makes:Make[]|null,
    bodyTypes:Type[]
}

const formSchema = z.object({
    model:z.string().min(1),
    color:z.string().min(1),
    acceleration:z.string().min(1),
    regNo:z.string().min(1).optional(),
    year:z.date(),
    availability:z.string().min(1),
    location:z.string().min(1),
    price:z.coerce.number().min(1),
    makeId:z.string().min(1),
    typeId:z.string().min(1),
    images:z.object({url:z.string()}).array(),
    rentalPrice:z.coerce.number().min(1),
    mileage:z.string().min(1),
    HP:z.string().min(1),
   engineSize:z.string().min(1),
   fuelType:z.string().min(1),
})

type CarFormValues = z.infer<typeof formSchema>

export const availabilityOptions=[
  {id:1, available:"No"},
  {id:2, available:"On Maintainance"},
  {id:3, available:"Yes"}
]
export const fuelTypeOptions=[
  {id:1, fuel:"gasoline"},
  {id:2, fuel:"diesel"},
  {id:3, fuel:"compressed natural gas"}
]
const CarForm:React.FC<CarFormProps> = ({
  initialData,
  makes,
  bodyTypes
}) => {
  const router = useRouter()
  const params = useParams()

  const form = useForm<CarFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData?{
      ...initialData,
      price:parseFloat(String(initialData?.price)),
      rentalPrice:parseFloat(String(initialData?.rentalPrice))
    }:{
      model:"",
      makeId:"",
      typeId:"",
      images:[],
      color:"",
      regNo:"",
      rentalPrice:0,
      price:0,
      HP:"",
      availability:"",
      location:"",
      fuelType:"",
      engineSize:'',
      acceleration:"",
      year:undefined,
      mileage:""
    }
  })
const isLoading = form.formState.isSubmitting
const toastMessage = initialData?"Body type successfully edited":"Body type was successfully added"
const action = initialData?"Edit":"Add"
  const onSubmit =async (data:CarFormValues)=>{
    try {
      if(initialData){
         await axios.patch(`/api/cars/${params.typeId}`,data)
      }else{
        await axios.post('/api/cars',data)
      }
      form.reset()
      router.refresh()
      router.push('/cars')
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
        await axios.delete(`/api/cars/${params.typeId}`)
        router.refresh()
        router.push('/cars')
        toast({
          title:"Success",
          description:"Car deleted successfully!",
          duration:5000
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
        <Heading title='Please fill this form with the car details' desc='This information is very useful some fields are optional'/>
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
        <div className=' w-full mb-3'>
        
        <FormField
              name='images'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=" font-bold font-mono text-xl text-red-300">
                        Images:
                    </FormLabel>
                    <FormControl>
                       <ImageUpload 
                         value={field.value.map(image=>image.url)}
                         disabled={isLoading}
                         onChange={(url) => field.onChange([...field.value,{url}])}
                         onRemove={(url) => field.onChange([...field.value.filter(current=>current.url!==url)])}
                       />
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <Separator />
        <div className=' grid grid-cols-1 sm:grid-cols-3 gap-8 '>
        <FormField
              name='makeId'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                      Make of the car:
                    </FormLabel>
                    <Select disabled={isLoading} defaultValue={field.value} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="make of the car" className=' flex justify-between items-center'/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {makes?.map(make=>(
                        <SelectItem key={make.id} value={make.id}>
                          <div className='  flex px-4 py-2 justify-between items-center rounded-md mb-2 '>
                            <div className=' txt-sm font-semibold text-gray-900'>
                              {make.name}
                            </div>
                            <div className=' relative overflow-hidden h-7 w-7 ml-2'>
                                <Image
                                 fill
                                 src={make.image}
                                 alt='image'
                                 className=' object-cover object-center'
                                 />
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='typeId'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                      Body Type of the car:
                    </FormLabel>
                    <Select disabled={isLoading} defaultValue={field.value} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Body type of the car"/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bodyTypes?.map(type=>(
                        <SelectItem key={type.id} value={type.id}>
                          <div className=' w-full flex px-4 py-2 justify-between items-center rounded-md'>
                            <div className=' txt-sm font-semibold text-gray-900'>
                              {type.name}
                            </div>
                            <div className=' relative overflow-hidden h-7 w-7 ml-2'>
                                <Image
                                 fill
                                 src={type.image}
                                 alt='image'
                                 className=' object-cover object-center '
                                 />
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='model'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                       Model:
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isLoading} placeholder='model of the car e.g gle63..'  {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              name='HP'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                       HorsePower:
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isLoading} placeholder='horse power e.g 750HP..'  {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              name='color'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                       Color:
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isLoading} placeholder='color of the car...'  {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              name='acceleration'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                       Color:
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isLoading} placeholder='acceleration from o-100km/hr e.g 3.7 sec..'  {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              name='engineSize'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                       EngineSize:
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isLoading} placeholder='size of the engine e.g 1000cc...'  {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              name='mileage'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                       Mileage:
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isLoading} placeholder='Mileage of the car e.g 110km...'  {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              name='regNo'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                       Registration Number*(optional):
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isLoading} placeholder='Registration number of the car if available...'  {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              name='location'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                       Location:
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isLoading} placeholder='location of the car e.g Nairobi,Ke...'  {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              name='availability'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                       Availability:
                    </FormLabel>
                    <Select disabled={isLoading} defaultValue={field.value} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Availability of the car"/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availabilityOptions.map(option=>(
                        <SelectItem key={option.id} value={option.available}>
                          {option.available}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='fuelType'
              control={form.control}
              render={({field})=>(
                <FormItem>
                    <FormLabel className=' text-xl font-semibold  text-gray-900'>
                      Fuel Type:
                    </FormLabel>
                    <Select disabled={isLoading} defaultValue={field.value} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Fuel type of the car"/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fuelTypeOptions.map(option=>(
                        <SelectItem key={option.id} value={option.fuel}>
                          {option.fuel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    </Select>
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

export default CarForm