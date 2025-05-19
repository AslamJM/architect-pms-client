import { useQuery, useQueryClient } from "@tanstack/react-query"
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

    return { data, isLoading,invalidate }
}