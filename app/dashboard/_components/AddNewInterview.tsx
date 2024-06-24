"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { chatSession } from "@/lib/AI"
import { db } from "@/lib/db"
import { PractitionerInterview } from "@/lib/schema"
import { useUser } from "@clerk/nextjs"
import { FormEvent, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import moment from "moment"
import { useRouter } from "next/navigation"


const AddNewInterview = () => {

  const [openDialog, setOpenDialog] = useState(false)
  const [jobRole, setJobRole] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [loading, setLoading] = useState(false)
  const [jsonResponse, setJsonResponse] = useState([] as any)
  const router = useRouter()

  const {user} = useUser()
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault()
    console.log({jobRole, jobDescription, yearsOfExperience})

    const InputPrompt = "Job Position: " + jobRole+ " Job description: " + jobDescription+  " ,Years of Experience: " + yearsOfExperience + " ,Depends on this information please give me " + process.env.NEXT_PUBLIC_TOTAL_INTERVIEW_QUESTIONS + " Interview Question with answered in Json format, Give question and answered as field in JSON"

    const result = await chatSession.sendMessage(InputPrompt)
    const mockJsonResponse = (result.response.text().replace('```json', '').replace('```', '' ))
    console.log(JSON.parse(mockJsonResponse)) 
    setJsonResponse(mockJsonResponse)

    if(mockJsonResponse) {
      const resp = await db.insert(PractitionerInterview).values({
        practionerInterviewId: uuidv4(),
        jsonPractitionerResp: mockJsonResponse,
        jobPosition: jobRole,
        jobDesc: jobDescription,
        jobExperienced: yearsOfExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress as string,
        createdAt:moment().format('DD-MM-YYYY'),
      }).returning({practionerInterviewId: PractitionerInterview.practionerInterviewId})
      console.log('Inserted Id:', resp)

      if(resp) {
        setOpenDialog(false)
        router.push(`/dashboard/interview/${resp[0].practionerInterviewId}`)
      }

    } else {
      console.log('error')
    }

    setLoading(false)
  }

  

  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
        <h2 className='font-bold text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Tell us more about your job interviewing</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>

       <div>
        <h2>Add details about your job position/role, Job description and years of Experience</h2>

    <div className="mt-7 my-2">
      <label>Job Role/Job position</label>
      <Input placeholder="Ex. Front end Developer..." required value={jobRole} onChange={(event) => setJobRole(event.target.value)} />
    </div>
    <div className=" my-3">
      <label>Job description/ Tech Stack</label>
      <Textarea placeholder="Ex. React, Nextjs, CSS..." required value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} />
    </div>
    <div className=" my-3">
      <label>Years of Experience</label>
      <Input placeholder="3" type="number" required value={yearsOfExperience} onChange={(event) => setYearsOfExperience(event.target.value)}   />
    </div>
       </div>
        <div className="gap-5 flex justify-end">
          <Button variant={"ghost"} onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button type="submit" disabled={loading} > {loading ? "Loading..." : "Start Interview"}  </Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview