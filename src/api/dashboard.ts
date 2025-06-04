import { apiClient } from "./client"
import type { RecentUpload, TableProject } from "@/types/project"

const routes = {
    recentUploads:"/dashboard/recent-uploads",
    counts:"/dashboard/counts",
    monthly:"/dashboard/this-month",
    recent:"/dashboard/recent-projects"
}



export async function getRecentUploads() {
    return await apiClient.get<Array<RecentUpload>>(routes.recentUploads)
}

export async function getCounts() {
    return await apiClient.get<{projects:number,users:number}>(routes.counts)
}

export async function getThismonthProjects() {
    return await apiClient.get<{
        completed:number,
        not_completed:number
        paid:number
        not_paid:number
    }>(routes.monthly)
}

export async function getRecentProjectsDashboard() {
    return await apiClient.get<Array<TableProject>>(routes.recent)
}