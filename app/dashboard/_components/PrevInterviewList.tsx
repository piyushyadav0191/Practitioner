"use client"

import { db } from '@/lib/db'
import { PractitionerInterview } from '@/lib/schema'
import { PractitionerResponse } from '@/types/main'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import InterviewItem from './InterviewItem'

const PrevInterviewList = () => {
    const {user} = useUser()
    const [interviewList, setInterviewList] = React.useState<PractitionerResponse[]>([])

    useEffect(() => {
        user&&GetInterviewList()
    })

    const GetInterviewList = async () => {
        const result = await db.select().from(PractitionerInterview).where(eq(PractitionerInterview.createdBy, user?.primaryEmailAddress?.emailAddress as string)).orderBy(desc(PractitionerInterview.id))
        setInterviewList(result)
    }

    

  return (
    <div>
         <h2 className='font-bold text-xl '>Your Previous Interview List</h2>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

         {interviewList&&interviewList.map((interview,index) => (
             <InterviewItem key={index} interview={interview} />
        ))}
    </div>
    </div>
  )
}

export default PrevInterviewList