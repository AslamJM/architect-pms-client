import { apiClient } from "./client"
import type { UploadInput } from "@/types/project"

const routes = {
    project:"/uploads/project",
    rm:"/uploads"
}

export async function uploadForPhase(input:{
    projectId:string,
    data:UploadInput
}) {
    return await apiClient.post(`${routes.project}/${input.projectId}`,input.data)
}

export async function deleteUpload(id:string) {
    return await apiClient.delete(`${routes.rm}/${id}`)
}