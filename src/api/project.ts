import { apiClient } from "./client";
import type { Phase, Project, TableProject, Task } from "@/types/project";
import type { CreatePhaseInput, CreateProjectDetailsInput, CreateTaskInput } from "@/schema/project";
import type { ProjectSearch } from "@/routes/_auth/dashboard/admin/projects.index";

const routes = {
    all: "/projects",
    admin: "/projects/admin",
    pm:"/projects/pm",
    user:"/projects/user",
    task:"/projects/task",
    count:"/projects/count",
    verify: (projectId: string, phase: number) => `/projects/${projectId}/verify-phase/${phase}`,
}

export async function createProject(input: CreateProjectDetailsInput) {
    return await apiClient.post<CreateProjectDetailsInput, Project>(routes.all, input)
}

function formatParam(query?: ProjectSearch) {
    const params = new URLSearchParams()
    if (query) {
        Object.keys(query).forEach(key => {
            if (query[key as keyof ProjectSearch] !== undefined) {
                params.append(key, query[key as keyof ProjectSearch]!.toString())
            }
        })
    }

    return params.toString()
}

export async function getAllProjectsForAdmin(query?:ProjectSearch) {
   const search = formatParam(query)
    return await apiClient.get<Array<TableProject>>(`${routes.admin}?${search}`);
}

export async function getAllUserProjects(query?: ProjectSearch) {
    const search = formatParam(query)
    return await apiClient.get<Array<TableProject>>(`${routes.user}?${search}`);
}

export async function getAllPMProjects(query?: ProjectSearch) {
    const search = formatParam(query)
    return await apiClient.get<Array<TableProject>>(`${routes.pm}?${search}`);
}

export async function getSingleProject(id: string) {
    return await apiClient.get<Project>(`${routes.all}/${id}`);
}

export async function addTask(input:{
    projectId:string,
    data:CreateTaskInput
}) {
    return await apiClient.post<CreateTaskInput,Task>(`${routes.all}/${input.projectId}/task`,input.data)
}

export async function addPhase(
    input:{projectId:string,data:CreatePhaseInput}
) {
    return await apiClient.post<CreatePhaseInput,Phase>(`${routes.all}/${input.projectId}/phase`,input.data)
}

export async function updateProject({id,data}:{
    id:string,
    data:Partial<Project>
}) {
    return await apiClient.patch<{success:true}>(`${routes.all}/${id}`,data)
}

export async function updateTask({ id, data }: {
    id: string,
    data: Partial<Task>
}) {
    return await apiClient.patch<{ success: true }>(`${routes.task}/${id}`, data)
}

export async function projectCounts() {
    return await apiClient.get<number>(routes.count);
}

export async function verifyPhase(input:{
    projectId: string
     phase: number
     verified: boolean
}) {
    return await apiClient.post<{ verified: boolean }, { success: boolean }>(
        routes.verify(input.projectId, input.phase),
        { verified: input.verified }
    );
 }