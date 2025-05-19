import type { User } from "./user"

export type TaskType = "PRIORITY" | "CLIENT_FEEDBACK" | "ELEMENT"
    | "ITEM_TO_KEEP" | "ITEM_TO_REMOVE" | "INSPIRATION"

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

export type Project = {
    id: string
    name: string
    description: string
    tasks: Array<Task>
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