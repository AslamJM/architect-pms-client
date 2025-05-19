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

export const createTaskSchema = z.object({
  content: z.string(),
  type: z.enum([
    'PRIORITY',
    'CLIENT_FEEDBACK',
    'ELEMENT',
    'ITEM_TO_KEEP',
    'ITEM_TO_REMOVE',
    'INSPIRATION',
  ]),
  image_urls: z.array(z.string()),
  completed: z.boolean(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
