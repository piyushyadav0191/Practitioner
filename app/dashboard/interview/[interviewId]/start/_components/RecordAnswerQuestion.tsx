"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner'
import { PractitionerResponse, QuestionAnswers } from '@/types/main'
import { chatSession } from '@/lib/AI'
import { db } from '@/lib/db'
import { UserAswer } from '@/lib/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

type RecordAnswerQuestionProps = {
    mockInterQuestion: QuestionAnswers[]
    activeQuestionIndex: number
    interviewData?: PractitionerResponse
}

const RecordAnswerQuestion = ({ activeQuestionIndex, mockInterQuestion, interviewData }: RecordAnswerQuestionProps) => {
    const { user } = useUser()

    const [userAnswer, setUserAnswer] = useState('')
    const [loading, setLoading] = useState(false)

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
        crossBrowser: true
    });


    useEffect(() => {
        results.map((result) => {
            // @ts-ignore
            setUserAnswer(prevAns => prevAns + result?.transcript)
        })
    }, [results])

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer()
        }
        if (userAnswer.length < 10) {
            toast.error("Error in recording answer, Please try again.")
            return;
        }
    }, [userAnswer])

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText()
        } else {
            startSpeechToText()
        }
    }

    const UpdateUserAnswer = async () => {
        console.log(userAnswer)
        setLoading(true)
        const feedbackPrompt = "Question:" + mockInterQuestion[activeQuestionIndex]?.question + "Answer:" + userAnswer + ", Depend on question and user answer for give interview question" + "please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field"

        const result = await chatSession.sendMessage(feedbackPrompt)
        const mockJsonResp = (result.response.text().replace('```json', '').replace('```', ''))

        console.log(mockJsonResp)
        const JSONFeedbackResp = JSON.parse(mockJsonResp)

        const res = await db.insert(UserAswer).values({
            practitionerInterviewIdRef: interviewData?.practionerInterviewId as string,
            question: mockInterQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: JSONFeedbackResp?.feedback as string,
            rating: JSONFeedbackResp?.rating as string,
            userEmail: user?.primaryEmailAddress?.emailAddress as string,
            createdAt: moment().format('DD-MM-YYYY')
        })

        if (res) {
            toast.success("Answer Recorded Successfully")
            setUserAnswer('')
            setResults([])
        }
        setResults([])
        setLoading(false)
    }

    return (
        <div className='flex items-center justify-center flex-col'>

            <div className='flex mt-10 flex-col justify-center items-center bg-secondary rounded-lg p-5'>

                <Image src="/webcam.png" width={400} height={400} alt='Webcam' className='absolute' />

                <Webcam mirrored={true} style={{
                    height: 400,
                    widows: 400,
                    zIndex: 10,

                }} />
            </div>
            <Button className='my-10 mt-4' variant={isRecording ? "destructive" : "default"} onClick={StartStopRecording} disabled={loading} >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>

            <Button onClick={() => console.log(userAnswer)}>
                Show User Answer
            </Button>
        </div>
    )
}

export default RecordAnswerQuestion