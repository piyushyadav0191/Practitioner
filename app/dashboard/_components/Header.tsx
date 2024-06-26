"use client"

import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {

    const path = usePathname()
    useEffect(() => {
        console.log(path)
    }, [])

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
                <a className="block font-bold text-xl my-1 text-teal-600" href="/">
      <span className="sr-only">Home</span>
      Practitioner
    </a>
         
            <UserButton />
        </div>
    )
}

export default Header

