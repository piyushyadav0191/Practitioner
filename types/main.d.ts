export interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

export type ParticularInterviewDataResponse = {
    id?: number
    createdAt: string
    createdBy: string
    jobDesc: string
    jobExperienced: string
    jobPosition: string
    jsonPractitionerResp: string
    practionerInterviewId: string

}
