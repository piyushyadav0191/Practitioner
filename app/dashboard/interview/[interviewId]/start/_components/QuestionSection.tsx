import { QuestionAnswers } from '@/types/main'
import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

type QuestionSectionProps = {
    mockInterQuestion: QuestionAnswers[]
    activeQuestionIndex: number
    }

const QuestionSection = ({mockInterQuestion,activeQuestionIndex}: QuestionSectionProps) => {
 
  const textToSpeach = (text: string) => {
    if("speechSynthesis" in window){
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'en-US';
      window.speechSynthesis.speak(speech);
    } else alert("Sorry, your browser doesn't support text to speech")
  }

  return (
    <div className='p-5 border rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {mockInterQuestion && mockInterQuestion.map((question, index) => (
                <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex=== index&& "bg-slate-900 text-white"} `}>Question no.{index+1} </h2>
            ))}
            </div>   
            <h2 className='my-5 text-sm md:text-lg'>{mockInterQuestion[activeQuestionIndex]?.question}</h2>
            <Volume2 onClick={() => textToSpeach(mockInterQuestion[activeQuestionIndex]?.question)} />
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
              <h2 className='flex gap-2 items-center text-blue-600'>
              </h2>
                <Lightbulb />
                <strong>Enable Video Web Cam and Microphone to Start your AI Generated Practitioner Interview, It has 5 Questions which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web Cam access you can disable it at any time if you want</strong>
            </div>
    </div>
  )
}

export default QuestionSection