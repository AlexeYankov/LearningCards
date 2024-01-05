import { baseApi } from '@/api/base'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createUser: builder.mutation<SignUpResponseType, SignUpArgsType>({
        invalidatesTags: ['Me'],
        query: body => ({
          body,
          method: 'Post',
          url: `v1/auth/sign-up`,
        }),
      }),
      logOut: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        query: () => ({
          method: 'Post',
          url: `v1/auth/logout`,
        }),
      }),
      login: builder.mutation<LoginResponseType, LoginArgsType>({
        invalidatesTags: ['Me'],
        query: body => ({
          body,
          method: 'Post',
          url: `v1/auth/login`,
        }),
      }),
      me: builder.query<AuthMeResponseType, void>({
        providesTags: ['Me'],
        query: () => `v1/auth/me`,
      }),
      recoverPassword: builder.mutation<void, RecoverPasswordArgsType>({
        query: body => ({
          body,
          method: 'Post',
          url: `v1/auth/recover-password`,
        }),
      }),
      resetPassword: builder.mutation<void, ResetPasswordArgsType>({
        invalidatesTags: ['Me'],
        query: ({ password, token }) => ({
          body: { password },
          method: 'Post',
          url: `v1/auth/reset-password/${token}`,
        }),
      }),
      updateUser: builder.mutation<AuthMeResponseType, UpdateUserArgsType>({
        invalidatesTags: ['Me'],
        query: body => {
          return {
            body: body,
            method: 'PATCH',
            url: `v1/auth/me`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateUserMutation,
  useLogOutMutation,
  useLoginMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
} = authService

export type AuthMeResponseType = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type LoginArgsType = {
  email: string
  password: string
  rememberMe?: boolean
}

export type LoginResponseType = {
  accessToken: string
}

export type SignUpArgsType = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type SignUpResponseType = {
  avatar: string
  created?: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated?: string
}

export type RecoverPasswordArgsType = {
  email: string
  html?: string
  subject?: string
}

export type ResetPasswordArgsType = {
  password: string
  token?: string
}

export type UpdateUserArgsType = {
  avatar?: File
  email?: string
  name?: string
}
