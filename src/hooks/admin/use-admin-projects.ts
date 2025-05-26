import { useSearch } from "@tanstack/react-router";
import { createBaseHook } from "../base";
import type { TableProject } from "@/types/project";
import { getAllProjectsForAdmin } from "@/api/project";

export const useAdminProjects = ()=>{
    const params = useSearch({from:"/_auth/dashboard/admin/projects/"})
    const items =  createBaseHook<TableProject>(["projects_admin"], getAllProjectsForAdmin,params)()
    return items
}

export const useRecentProjectsAdmin = ()=>{
    const {data,isLoading,invalidate} = createBaseHook<TableProject>(["projects_admin"], getAllProjectsForAdmin)()

    return {
        data,
        isLoading,
        invalidate,
    }
}