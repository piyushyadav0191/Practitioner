"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {

    const path = usePathname()
    useEffect(() => {
        console.log(path)
    },[])

  return (
   <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
     <Image src="/logo.svg" alt="logo" width={55} height={65} />
     <ul className='flex gap-4 hidden md:flex'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard" && "text-primary font-bold"} `}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard/questions" && "text-primary font-bold"} `}>Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard/upgrade" && "text-primary font-bold"} `}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard/how" && "text-primary font-bold"} `}>How it works?</li>
     </ul>
     <UserButton />
   </div>
  )
}

export default Header

