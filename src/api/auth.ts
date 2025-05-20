import { apiClient } from "./client";
import type { LoginInput } from "@/schema/auth";
import type { Me } from "@/types/user";

const routes = {
    login: "/auth/sign-in",
    profile: "/auth/profile",
    signout:"/auth/logout"
}

export async function login(input: LoginInput) {
    const res = await apiClient.post<LoginInput, Me>(routes.login, input)
    return res
}

export async function getMe() {
    return await apiClient.get<Me>(routes.profile)
}

export async function logout() {
    return await apiClient.post<{},{success:true}>(routes.signout,{})
}