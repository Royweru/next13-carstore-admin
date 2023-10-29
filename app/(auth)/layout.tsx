export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className=" flex justify-center items-center w-full h-full mt-28">
        {children}
      </div>
      )
  }
  