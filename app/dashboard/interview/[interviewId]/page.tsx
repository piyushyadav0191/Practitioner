"use client"

import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { PractitionerInterview } from '@/lib/schema'
import { PractitionerResponse } from '@/types/main'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Webcam from "react-webcam";


type InterviewPageProps = {
  params: {
    interviewId: string
  }
}
const InterviewPage = ({ params }: InterviewPageProps) => {


  const [interviewData, setInterviewData] = React.useState<PractitionerResponse>()
  const [webCamEnabled, setWebCamEnabled] = React.useState<boolean>(false)

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db.select().from(PractitionerInterview).where(eq(PractitionerInterview.practionerInterviewId, params.interviewId))
    setInterviewData(result[0])
    console.log(result)
  }

  return (
    <div className='my-6 '>
      <h2 className='font-bold text-2xl'>Let's get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div>
          {webCamEnabled ? <Webcam onUserMedia={() => setWebCamEnabled(true)} onUserMediaError={() => setWebCamEnabled(false)} style={{
            height: 300,
            width: 300
          }} /> : (
            <>
              <WebcamIcon className='h-72 w-full my-7  p-20 bg-secondary rounded-lg border' />
              <Button className='w-full' onClick={() => setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
            </>
          )}
        </div>
        <div className='flex flex-col my-5 gap-4'>
          <div className='flex flex-col p-5 rounded-lg border gap-6'>
            <h2> <strong>Job Position</strong> {interviewData?.jobPosition} </h2>
            <h2> <strong>Years of Experience</strong> {interviewData?.jobExperienced} </h2>
            <h2> <strong>Job Description</strong> {interviewData?.jobDesc} </h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-500'>   <Lightbulb /> <strong>Information</strong>
            </h2>
            <h2>Enable Video Web Cam and Microphone to Start your AI Generated Practitioner Interview, It has 5 Questions which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web Cam access you can disable it at any time if you want</h2>
          </div>
        </div>
      </div>

      <div className='flex justify-end items-end my-4'>
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
        <Button>Start Interview</Button>
        </Link>
      </div>

    </div>
  )
}

export default InterviewPage