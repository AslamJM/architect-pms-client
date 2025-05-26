
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/user";
import { getUsers } from "@/api/user";

export const useUsers = ()=>{
    const {data,isLoading,error} = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    })

    const qc = useQueryClient();

    const create = (created:User) => {
        // This function can be used to optimistically update the user list
        // after creating a new user, if needed.
        qc.setQueryData(['users'], (oldData: Array<User> | undefined) => {
            if (!oldData) return [created];
            return [created, ...oldData];
        });
    };

    return {
        data,
        isLoading,
        error,
        create,
        invalidate: async () => await qc.invalidateQueries({ queryKey: ['users'] }),
    };
}