import { createBaseHook } from "../base";
import type { TableProject } from "@/types/project";
import { getAllProjectsForAdmin } from "@/api/project";

export const useAdminProjects = createBaseHook<TableProject>(["projects_admin"], getAllProjectsForAdmin)