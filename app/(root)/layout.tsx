import { Navbar } from "@/components/navbar";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className=" w-full h-full">
         
          {children}
      </div>
    );
  }