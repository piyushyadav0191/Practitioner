"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { chatSession } from "@/lib/AI"
import { SubmitEvent } from "@/types/main"
import { useState } from "react"


const AddNewInterview = () => {

  const [openDialog, setOpenDialog] = useState(false)
  const [jobRole, setJobRole] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState('')


  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    console.log({jobRole, jobDescription, yearsOfExperience})

    const InputPrompt = "Job Position: " + jobRole+ " Job description: " + jobDescription+  " ,Years of Experience: " + yearsOfExperience + " ,Depends on this information please give me " + process.env.NEXT_PUBLIC_TOTAL_INTERVIEW_QUESTIONS + " Interview Question with answered in Json format, Give question and answered as field in JSON"

    const result = await chatSession.sendMessage(InputPrompt)
    console.log(result.response.text())

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
          <Button type="submit">Start Interview</Button>
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