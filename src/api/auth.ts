import { apiClient } from "./client";
import type { LoginInput } from "@/schema/auth";
import type { Me } from "@/types/user";

const routes = {
    login: "/auth/sign-in",
    profile: "/auth/profile"
}

export async function login(input: LoginInput) {
    const res = await apiClient.post<LoginInput, Me>(routes.login, input)
    return res
}

export async function getMe() {
    return await apiClient.get<Me>(routes.profile)
}