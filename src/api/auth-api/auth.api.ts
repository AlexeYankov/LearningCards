import {baseApi} from "@/api/cards.api.ts";

export const authService = baseApi.injectEndpoints({
    endpoints: builder => {
        return {
            me: builder.query<any, void>({
                query: () => `v1/auth/me`,
                providesTags:['Me']
            }),

            createUser: builder.mutation<any, void>({
                query: (body: any) => ({
                    url: `v1/auth/sign-up`,
                    method: 'Post',
                    body,
                }),
                invalidatesTags:['Me']
            }),
            login: builder.mutation<any, any>({
                query: (body: any) => ({
                    url: `v1/auth/login`,
                    method: 'Post',
                    body,
                }),
                invalidatesTags:['Me']
            }),
            recoverPassword: builder.mutation<any, void>({
                query: (body: any) => ({
                    url: `v1/auth/recover-password`,
                    method: 'Post',
                    body,
                }),
                invalidatesTags:['Me']
            }),
            logOut: builder.mutation<any, void>({
                query: () => ({
                    url: `v1/auth/logout`,
                    method: 'Post',
                }),
                invalidatesTags:['Me']
            }),
        }
    },
})

export const {
    useMeQuery,
    useCreateUserMutation,
    useLoginMutation,
    useRecoverPasswordMutation,
    useLogOutMutation
} = authService