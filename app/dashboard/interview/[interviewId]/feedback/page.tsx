"use client"

import { db } from '@/lib/db'
import React from 'react'
import {UserAswer} from "@/lib/schema"
import { eq } from 'drizzle-orm'
import { useEffect } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { UserAswerProp } from '@/types/main'
import { ChevronsUpDown } from 'lucide-react'


const Feedback = ({params}: {params: {interviewId: string}}) => {

  const [feedbackList, setFeedbackList] = React.useState<UserAswerProp[]>([])

  useEffect(() => {
    GetFeedback()
  }, [])

  const GetFeedback = async () => {
    const result = await db.select().from(UserAswer).where(eq(UserAswer.practitionerInterviewIdRef, params.interviewId)).orderBy(UserAswer.id);
    console.log(result)
    setFeedbackList(result)
  }
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold text-green-500'>Congratulations</h2>
        <h2 className='font-bold text-xl'>Here is your interview feedback</h2>
        <h2 className='text-primary text-lg my-3'>Your Overall interview rating: <strong>7/10</strong></h2>

    <h2 className='text-sm text-gray-700'>Find below interview question with correct answer, Your answer and feedback for improvement </h2>

    {feedbackList&& feedbackList.map((item, index) => (
      <Collapsible key={index}>
      <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between'>{item.question} <ChevronsUpDown /> </CollapsibleTrigger>
      <CollapsibleContent>
      <div className='flex flex-col gap-4'>
        <h2 className='text-red-400 p-2 border rounded-sm'> <strong>Rating:</strong>{item.rating}</h2>
      </div>
      </CollapsibleContent>
    </Collapsible>
    ))
}

    </div>
  )
}

export default Feedback