import { useSearch } from "@tanstack/react-router"
import { useAbilty } from "./use-ability"

export const useSearchParams = ()=>{
    const {isAdmin,isUser} = useAbilty()

    const adminSearchParams = useSearch({ 
        from: isAdmin ? "/_auth/dashboard/admin/projects/"
        :isUser ? "/_auth/dashboard/user" 
        : "/_auth/dashboard/pm" 
    })

    return adminSearchParams
}