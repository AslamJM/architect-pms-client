import { useQuery } from "@tanstack/react-query"
import { getSingleProject } from "@/api/project"

export const useSingleProject = (id: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ['project', id],
        queryFn: () => getSingleProject(id)
    })

    return { data, isLoading }
}