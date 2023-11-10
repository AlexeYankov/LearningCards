import {baseApi} from "@/api/cards.api.ts";

export const authService: any = baseApi.injectEndpoints({
    endpoints: builder => {
        return {
            me: builder.query<any, void>({
                query: () => `v1/auth/me`,
            }),
            createUser: builder.mutation<any, void>({
                query: (body: any) => ({
                    url: `v1/auth/sign-up`,
                    method: 'Post',
                    body,
                }),
            }),
            login: builder.mutation<any, void>({
                query: (body: any) => ({
                    url: `v1/auth/login`,
                    method: 'Post',
                    body,
                }),
            }),
            verifyEmail: builder.mutation<any, void>({
                query: (body: any) => ({
                    url: `v1/auth/verify-email`,
                    method: 'Post',
                    body,
                }),
            }),
            logOut: builder.mutation<any, void>({
                query: (body: any) => ({
                    url: `v1/auth/login`,
                    method: 'Post',
                    body,
                }),
            }),
        }
    },
})

export const {useMeQuery, useCreateUserMutation,useLoginMutation,useVerifyEmailMutation} = authService