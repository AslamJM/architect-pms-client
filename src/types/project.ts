import type { User } from "./user"

export type TaskType = "PRIORITY" | "CLIENT_FEEDBACK" | "ELEMENT"
    | "ITEM_TO_KEEP" | "ITEM_TO_REMOVE" | "INSPIRATION"

export type UploadType = "UPLOADED_FILES" | "WORKING_FILES" |"RENDERED_IMAGES" 

export type TaskImage = {
    id: number
    url: string
    task_id: string
}

export type Task = {
    id: string
    content: string
    type: TaskType
    completed: boolean
    images: Array<TaskImage>
    project_id: string
}

export type Phase = {
    phase_number:number
    verified:boolean
    uploads:Array<{
        type:UploadType
        url:string
    }>
}

export type UploadInput = {
    url:string
    phase_number:number 
    type:UploadType
}

export type Project = {
    id: string
    name: string
    description: string
    tasks: Array<Task>
    phases:Array<Phase>
    design_notes: string
    assigned_to_id: string
    assigned_by_id: string
    assigned_to: User
    assigned_by: User
    created_at: Date
    is_completed: boolean
    is_paid: boolean
}

export type TableProject = {
    id: string
    name: string
    assined_to: string
    is_completed: boolean
    is_paid: boolean
    created_at: Date
}