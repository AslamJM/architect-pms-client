import { createBaseHook } from "../base";
import { getAllPMProjects } from "@/api/project";

export const usePMProjects = createBaseHook(["project_pm"],getAllPMProjects)