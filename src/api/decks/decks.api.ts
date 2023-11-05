import { baseApi } from '@/api/cards.api.ts'
import { CardsResponsType, DecksType } from '@/api/common.api.ts'

type GetDecksParamsType = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: 'asc' | 'desc'
}

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<CardsResponsType, { name: string }>({
        invalidatesTags: ['Decks'],
        query: params => {
          return {
            body: params,
            method: 'POST',
            url: `v1/decks`,
          }
        },
      }),
      getDecks: builder.query<DecksType, GetDecksParamsType | void>({
        providesTags: ['Decks'],
        query: params => {
          return {
            params: params ?? undefined,
            url: `v1/decks/`,
          }
        },
      }),
    }
  },
})

export const { useCreateDeckMutation, useGetDecksQuery } = decksApi
