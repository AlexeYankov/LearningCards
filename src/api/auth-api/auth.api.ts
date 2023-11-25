import {baseApi} from "@/api/cards.api.ts";


export const authService = baseApi.injectEndpoints({
    endpoints: builder => {
        return {
            me: builder.query<AuthMeResponseType, void>({
                query: () => `v1/auth/me`,
                providesTags: ['Me']
            }),
            updateUser: builder.mutation<AuthMeResponseType, UpdateUserArgsType>({
                query: (body) => {
                    return {
                        url: `v1/auth/me`,
                        method: 'PATCH',
                        body:body,
                    }
                },
                invalidatesTags: ['Me']
            }),
            createUser: builder.mutation<SignUpResponseType, SignUpArgsType>({
                query: (body) => ({
                    url: `v1/auth/sign-up`,
                    method: 'Post',
                    body,
                }),
                invalidatesTags: ['Me']
            }),
            login: builder.mutation<LoginResponseType, LoginArgsType>({
                query: (body) => ({
                    url: `v1/auth/login`,
                    method: 'Post',
                    body,
                }),
                invalidatesTags: ['Me']
            }),
            logOut: builder.mutation<void, void>({
                query: () => ({
                    url: `v1/auth/logout`,
                    method: 'Post',
                }),
                invalidatesTags: ['Me']
            }),
            recoverPassword: builder.mutation<void, RecoverPasswordArgsType>({
                query: (body) => ({
                    url: `v1/auth/recover-password`,
                    method: 'Post',
                    body,
                }),
                invalidatesTags: ['Me']
            }),
            resetPassword: builder.mutation<void, ResetPasswordArgsType>({
                query: ({token, password}) => ({
                    url: `v1/auth/reset-password/${token}`,
                    method: 'Post',
                    body: {password}
                }),
                invalidatesTags: ['Me']
            }),

        }
    },
})

export const {
    useMeQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useLoginMutation,
    useRecoverPasswordMutation,
    useLogOutMutation,
    useResetPasswordMutation
} = authService


export type AuthMeResponseType = {
    avatar: string;
    id: string;
    email: string;
    isEmailVerified: boolean;
    name: string;
    created: string;
    updated: string;
};

export type LoginArgsType = {
    password: string;
    email: string;
    rememberMe?: boolean;
};

export type LoginResponseType = {
    accessToken: string;
};

export type SignUpArgsType = {
    html?: string
    name?: string;
    password: string;
    email: string;
    subject?: string
    sendConfirmationEmail?: boolean
};

export type SignUpResponseType = {
    avatar: string;
    id: string;
    email: string;
    isEmailVerified: boolean;
    name: string;
    created?: string;
    updated?: string;
};

export type RecoverPasswordArgsType = {
    html?: string;
    email: string;
    subject?: string;
}

export type ResetPasswordArgsType = {
    token?: string
    password: string
}

export type UpdateUserArgsType = {
    avatar?: File
    name?: string
    email?: string
}