export type UserRole = "ADMIN" | "USER" | "PROJECT_MANAGER"

export type Me = {
    id: string
    name: string
    role: UserRole

}