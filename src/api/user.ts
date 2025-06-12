import { apiClient } from "./client"
import type { CreateUserInput } from "@/schema/user"
import type { User } from "@/types/user"

const routes = {
    base: "/users"
}

export async function getUsers() {
    return await apiClient.get<Array<User>>(`${routes.base}`)
}

export async function createUser(input: CreateUserInput) {
    return await apiClient.post<CreateUserInput, User>(`${routes.base}`, input)
}

export async function updateUser(id: string, input: Partial<CreateUserInput>) {
    return await apiClient.patch(`${routes.base}/${id}`, input)
}

