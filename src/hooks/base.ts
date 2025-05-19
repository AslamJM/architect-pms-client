import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { QueryKey } from "@tanstack/react-query";

export const createBaseHook = <T>(queryKey: QueryKey, queryFn: () => Promise<Array<T>>) => {
    return function () {
        const queryClient = useQueryClient()

        const { isLoading, data } = useQuery({
            queryKey: queryKey,
            queryFn: queryFn,
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
            invalidate
        }
    }
}