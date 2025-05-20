import { useAuthContext } from "@/integrations/context/auth-context"

export const useAbilty = ()=>{
    const {me} = useAuthContext()

    const canAddTasks = me && me.role!=="USER"
    const isUser = me && me.role==="USER"
    const isAdmin = me && me.role==="ADMIN"
    const isPM = me && me.role==="PROJECT_MANAGER"

    return {canAddTasks,isUser,isAdmin,isPM}
}