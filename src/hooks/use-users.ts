import { createBaseHook } from "./base";
import type { User } from "@/types/user";
import { getUsers } from "@/api/user";

export const useUsers = createBaseHook<User>(["users"], getUsers)