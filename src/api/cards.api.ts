import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReAuth} from "@/api/base-query-with-reauth.ts";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Cards', 'Decks','Me'],
    baseQuery:baseQueryWithReAuth,
    endpoints: () => ({}),
})
