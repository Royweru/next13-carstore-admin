"use client";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState(false);

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Body Type", path: "/types", active: pathname === "/types" },
    { title: "Make", path: "/make", active: pathname === "/make" },
    { title: "Cars", path: "/cars", active: pathname === "/cars" },
  ];

  return (
    <nav className=" bg-blue-200  w-full border-b-[2px] border-blue-500 md:border-0 md:static">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <a href="/">
           <Image
            height={150}
            width={50}
            alt="image"
            className=" rounded"
            src="/images/logo.jpg"
            />
          </a>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 flex justify-self-center pb-3 mt-8 md:block  md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} 
                className={cn(" hover:text-indigo-600",
                 item.active?" bg-slate-400 border font-medium p-2 text-indigo-600 text-2xl border-dotted":" text-gray-600"
                )}
                >
                  <a href={item.path}>{item.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="">
            <UserButton afterSignOutUrl="/" />
          </div>
      </div>
    </nav>
  );
}
