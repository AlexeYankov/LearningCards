import { baseApi } from '@/api/cards.api.ts'
import { DecksType } from '@/api/common.api.ts'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksType, void>({
        query: () => `v1/decks`,
        providesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery } = decksService
