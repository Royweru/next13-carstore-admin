import { Navbar } from "@/components/navbar";
import{currentUser} from "@clerk/nextjs"
import {redirect} from 'next/navigation'
export default async function SetupLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
   const user = await currentUser()

   if(!user){
  redirect('/sign-in')
   }
    return (
      <>
      <Navbar />
        {children}
      </>
      )
  }
  