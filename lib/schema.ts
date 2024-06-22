import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const PractitionerInterview = pgTable('practitioner_interview', {
    id: serial("id").primaryKey(),
    jsonPractitionerResp: text("json_practitioner_resp").notNull(),
    jobPosition: varchar("job_position").notNull(),
    jobDesc: varchar("job_desc").notNull(),
    jobExperienced: varchar("job_experienced").notNull(),
    createdBy: varchar("created_by").notNull(),
    createdAt: varchar("created_at").notNull(),
    practionerInterviewId: varchar("practioner_interview_id").notNull(),
})

