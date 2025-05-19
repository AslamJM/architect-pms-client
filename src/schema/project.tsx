import { z } from 'zod'

export const createProjectDetailsSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  design_notes: z.string(),
  assigned_to_id: z.string(),
})
export type CreateProjectDetailsInput = z.infer<
  typeof createProjectDetailsSchema
>
export const projectDetailsDV: CreateProjectDetailsInput = {
  name: '',
  description: '',
  design_notes: '',
  assigned_to_id: '',
}
