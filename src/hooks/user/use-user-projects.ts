import { useSearch } from "@tanstack/react-router";
import { createBaseHook } from "../base";
import type { TableProject } from "@/types/project";
import { getAllUserProjects } from "@/api/project";

export const useUserProjects =  ()=>{
    const params = useSearch({from:"/_auth/dashboard/user"})
        const items =  createBaseHook<TableProject>(["projects_user"], getAllUserProjects,params)()
        return items
}