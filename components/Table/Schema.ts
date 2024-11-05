import { z } from "zod"

// Define the valid status and priority values
export const statusEnum = z.enum([
  "pending",
  "completed",
  "backlog",
  "todo",
  "in progress",
  "done",
  "canceled"
])

export const CaseSchema = z.object({
  id: z.string(),
  caseTitle: z.string(),
  status: statusEnum, // Use the enum instead of generic string
  label: z.string(),
  shareList: z.array(z.string()),
  fileCount: z.number().int().nonnegative(),
})

export type Case = z.infer<typeof CaseSchema>;
