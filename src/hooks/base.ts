import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { QueryKey } from "@tanstack/react-query";
import type { ProjectSearch } from "@/routes/_auth/dashboard/admin/projects.index";

export const createBaseHook = <T>(queryKey: QueryKey, queryFn: (search?: ProjectSearch) => Promise<Array<T>>,params?:ProjectSearch) => {
    return function () {
        const queryClient = useQueryClient()
    
        const { isLoading, data,error } = useQuery({
            queryKey: [...queryKey,params],
            queryFn:()=>queryFn(params),
        })

        const create = (created: T) => {
            queryClient.setQueryData(queryKey, (oldData: Array<T>) => [created, ...oldData])
        }

        const invalidate = async () => await queryClient.invalidateQueries({
            queryKey: queryKey
        })

        return {
            isLoading,
            data,
            create,
            invalidate,
            error
        }
    }
}