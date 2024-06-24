"use client"

import { db } from '@/lib/db'
import { PractitionerInterview } from '@/lib/schema'
import { PractitionerResponse, QuestionAnswers } from '@/types/main'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import QuestionSection from './_components/QuestionSection'
import RecordAnswerQuestion from './_components/RecordAnswerQuestion'



const StartInterviewPage = ({params}: {params: {interviewId: string}}) => {

    const [interviewData, setInterviewData] = React.useState<PractitionerResponse>()
    const [MockinterQuestion, setMockinterQuestion] = React.useState<QuestionAnswers[]>([])
    const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0)

    useEffect(() => {
        GetInterviewDetails()
    }, [])
    
    const GetInterviewDetails = async () => {
        const result = await db.select().from(PractitionerInterview).where(eq(PractitionerInterview.practionerInterviewId, params.interviewId))
        const jsonMockResp = JSON.parse(result[0].jsonPractitionerResp)
        console.log(jsonMockResp)  
        setMockinterQuestion(jsonMockResp)
        setInterviewData(result[0])
    }      

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
{/* questions */}
    <QuestionSection mockInterQuestion={MockinterQuestion} activeQuestionIndex={activeQuestionIndex} />
{/* video audio recording */}
<RecordAnswerQuestion />
    </div>
  )
}

export default StartInterviewPage