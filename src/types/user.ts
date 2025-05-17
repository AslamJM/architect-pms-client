export type UserRole = "ADMIN" | "USER" | "PROJECT_MANAGER"

export type Me = {
    id: string
    name: string
    role: UserRole

}

export type User = {
    id: string
    name: string
    username: string
    role: UserRole
}