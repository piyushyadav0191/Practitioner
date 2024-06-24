"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';


const RecordAnswerQuestion = () => {

    const [userAnswer, setUserAnswer] = useState('')

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
        crossBrowser: true
    });


    useEffect(() => {
        results.map((result) => {
            // @ts-ignore
            setUserAnswer(prevAns=> prevAns+result?.transcript)
        })
    }, [results])

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;


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
            <Button className='my-10 mt-4' variant={isRecording ? "destructive": "default"} onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>

                <Button onClick={() => console.log(userAnswer)}>
                    Show User Answer
                </Button>
        </div>
    )
}

export default RecordAnswerQuestion