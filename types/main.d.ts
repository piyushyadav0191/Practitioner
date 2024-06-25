export type PractitionerResponse = {
    id?: number
    createdAt: string
    createdBy: string
    jobDesc: string
    jobExperienced: string
    jobPosition: string
    jsonPractitionerResp: string
    practionerInterviewId: string

}

export type QuestionAnswers= {
    question: string
    answer: string
} 

export type UserAswerProp= {
    id?: number,
    practitionerInterviewIdRef: string,
    question: string,
    correctAns: string,
    userAns: string,
    feedback: string,
    rating: string,
    userEmail: string,
    createdAt: string,
}