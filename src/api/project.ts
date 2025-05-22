import { apiClient } from "./client";
import type { Phase, Project, TableProject, Task } from "@/types/project";
import type { CreatePhaseInput, CreateProjectDetailsInput, CreateTaskInput } from "@/schema/project";

const routes = {
    all: "/projects",
    admin: "/projects/admin",
    user:"/projects/user"
}

export async function createProject(input: CreateProjectDetailsInput) {
    return await apiClient.post<CreateProjectDetailsInput, Project>(routes.all, input)
}

export async function getAllProjectsForAdmin() {
    return await apiClient.get<Array<TableProject>>(routes.admin);
}

export async function getAllUserProjects() {
    return await apiClient.get<Array<TableProject>>(routes.user)
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