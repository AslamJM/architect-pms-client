import { apiClient } from "./client"
import type { RecentUpload } from "@/types/project"

const routes = {
recentUploads:"/dashboard/recent-uploads"
}



export async function getRecentUploads() {
    return await apiClient.get<Array<RecentUpload>>(routes.recentUploads)
}