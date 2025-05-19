import { useParams } from "@tanstack/react-router"

export const useProjectId = ()=>{
    const params = useParams({from:"/_auth/dashboard/admin/projects/$id"})
    return params.id
}