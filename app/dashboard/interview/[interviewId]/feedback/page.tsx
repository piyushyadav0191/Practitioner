"use client"

import { db } from '@/lib/db'
import React from 'react'
import { UserAswer } from "@/lib/schema"
import { eq } from 'drizzle-orm'
import { useEffect } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { UserAswerProp } from '@/types/main'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


const Feedback = ({ params }: { params: { interviewId: string } }) => {
  const router = useRouter()
  const [feedbackList, setFeedbackList] = React.useState<UserAswerProp[]>([])
  const [overallRating, setOverallRating] = React.useState<number>(0)

  useEffect(() => {
    GetFeedback()
  }, [])

  const GetFeedback = async () => {
    const result = await db.select().from(UserAswer).where(eq(UserAswer.practitionerInterviewIdRef, params.interviewId)).orderBy(UserAswer.id);
    console.log(result)
    // @ts-ignore
    setFeedbackList(result)
  }


  async function calculateAverageRating() {
    const result = await db.select().from(UserAswer).where(eq(UserAswer.practitionerInterviewIdRef, params.interviewId)).orderBy(UserAswer.id);
    if (!Array.isArray(result)) {
      throw new Error("Input must be an array of ratings");
    }
    const ratings = result.map((result) => parseFloat(result.rating));
  
    if (ratings.length === 0) {
      return 0; 
    }
  
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  
    const average = sum / ratings.length;
  
    return average;
  }

  calculateAverageRating().then((avg) => {
   
    setOverallRating(avg)
  
  })
  

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold text-green-500'>Congratulations</h2>
      <h2 className='font-bold text-xl'>Here is your interview feedback</h2>
      <h2 className='text-primary text-lg my-3'>Your Overall interview rating: {overallRating}
         <strong>{feedbackList?.length===0?
        <h2 className='font-bold text-xl text-gray-500'>No Interview rating</h2> 
       : (
        <>
          <h2 className='text-sm text-gray-700'>Find below interview question with correct answer, Your answer and feedback for improvement </h2>

{feedbackList && feedbackList.map((item, index) => (
  <Collapsible key={index}>
    <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between w-full'>{item.question} <ChevronsUpDown /> </CollapsibleTrigger>
    <CollapsibleContent className='mt-7'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-red-400 p-2 border rounded-sm'> <strong>Rating:</strong>{item.rating}</h2>
        <h2 className='p-2 border rounded-lg bg-red-300 text-sm text-red-800'><strong>Your Answer: </strong>{item.userAns}</h2>
        <h2 className='p-2 border rounded-lg bg-green-200 text-sm text-green-600'><strong>Correct Answer: </strong>{item.correctAns}</h2>
        <h2 className='p-2 border rounded-lg bg-blue-200 text-sm text-blue-600'><strong>Feedback: </strong>{item.feedback}</h2>

      </div>
    </CollapsibleContent>
  </Collapsible>
))
}
        </>
       ) } 
       </strong></h2>

    
      <Button onClick={() => router.replace("/dashboard")}>Back to Home</Button>
    </div>
  )
}

export default Feedback