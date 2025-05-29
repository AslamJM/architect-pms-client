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

export async function multiPartFormDataUploads(data:FormData) {
  
       const response = await fetch(`${import.meta.env.VITE_API_URL}/uploads/task-image`,{
        method:"POST",
        body:data,
        credentials:"include"
       })

       if(response.ok) {
            const urls = await response.json() as Array<string>
            return urls
       }

       throw new Error(`error uploading data`)
}