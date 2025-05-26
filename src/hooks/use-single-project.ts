import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { Task } from "@/types/project"
import { getSingleProject } from "@/api/project"

export const useSingleProject = (id: string) => {

    const queryKey = ['project', id]

    const { data, isLoading, } = useQuery({
        queryKey,
        queryFn: () => getSingleProject(id)
    })

    const qc = useQueryClient()

    const invalidate = ()=>{
        qc.invalidateQueries({queryKey})
    }

    const addNewTaskToProject =  (task:Task)=>{
        if (!data) return
        const newData = {
            ...data,
            tasks: [...data.tasks, task]
        }
        qc.setQueryData(queryKey, newData)
    }

    const removeTaskFromProject = (taskId: string) => {
        if (!data) return
        const newData = {
            ...data,
            tasks: data.tasks.filter((task) => task.id !== taskId)
        }
        qc.setQueryData(queryKey, newData)
    }

    const updateTaskInProject = (task: Partial<Task>) => {
        if (!data) return
        const newData = {
            ...data,
            tasks: data.tasks.map((t) => (t.id === task.id ? {...t,...task} : t))
        }
        qc.setQueryData(queryKey, newData)
    }

    const updateProject = (update: Partial<typeof data>) => {
        if (!data) return
        const newData = {
            ...data,
            ...update
        }
        qc.setQueryData(queryKey, newData)
    }


    return { data, isLoading,invalidate,addNewTaskToProject,removeTaskFromProject,updateTaskInProject,updateProject }   
 }
