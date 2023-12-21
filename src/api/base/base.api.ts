import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from './base-query-with-reauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Cards', 'Decks', 'Me'],
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
})
