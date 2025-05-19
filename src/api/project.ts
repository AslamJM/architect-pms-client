import { apiClient } from "./client";
import type { Project, TableProject } from "@/types/project";
import type { CreateProjectDetailsInput } from "@/schema/project";

const routes = {
    all: "/projects",
    admin: "/projects/admin"
}

export async function createProject(input: CreateProjectDetailsInput) {
    return await apiClient.post<CreateProjectDetailsInput, Project>(routes.all, input)
}

export async function getAllProjectsForAdmin() {
    return await apiClient.get<Array<TableProject>>(routes.admin);
}

export async function getSingleProject(id: string) {
    return await apiClient.get<Project>(`${routes.all}/${id}`);
}