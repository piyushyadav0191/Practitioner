import { Button } from '@/components/ui/button'
import { PractitionerResponse } from '@/types/main'
import Link from 'next/link'
import React from 'react'

type Props = {
    interview: PractitionerResponse
}

const InterviewItem = ({interview}: Props) => {
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='font-semibold text-sm text-gray-800'>{interview?.jobExperienced} Years of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created At: {interview?.createdAt} </h2>
        <div className='flex justify-between my-2 mt-2 gap-3'>
            <Link href={`/dashboard/interview/${interview?.practionerInterviewId}/feedback`}>
            <Button size={"sm"} variant={"outline"} className='w-full'>Feedback</Button>
            </Link>
            <Link href={`/dashboard/interview/${interview?.practionerInterviewId}/start`}>
            <Button className='w-full'>Start</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewItem