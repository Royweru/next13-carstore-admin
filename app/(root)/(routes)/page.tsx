import Heading from '@/components/heading'
import { Separator } from '@/components/ui/separator'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between space-y-8 ">
     <Heading title='Welcome to the Carpool admin' desc='Add the new data today!' />
      <Separator />
      
    </main>
  )
}


