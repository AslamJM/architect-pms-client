import { createBaseHook } from "../base";
import { getAllUserProjects } from "@/api/project";

export const useUserProjects = createBaseHook(["project_users"],getAllUserProjects)