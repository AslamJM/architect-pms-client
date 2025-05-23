import { useParams } from "@tanstack/react-router"
import { useAbilty } from "./use-ability"

export const useProjectId = ()=>{
    const {isAdmin,isUser} = useAbilty()
    const params = useParams({from:isAdmin?"/_auth/dashboard/admin/projects/$id":"/_auth/dashboard/user/projects/$id"})
    return params.id
}