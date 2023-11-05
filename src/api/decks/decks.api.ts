import { baseApi } from '@/api/cards.api.ts'
import { CardsResponsType, DecksType } from '@/api/common.api.ts'

type GetDecksParamsType = {
  itemsPerPage?: number
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: 'desc' | 'asc'
  currentPage?: number
}

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksType, GetDecksParamsType | void>({
        query: params => {
          return {
            url: `v1/decks/`,
            params: params ?? undefined,
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<CardsResponsType, { name: string }>({
        query: params => {
          return {
            url: `v1/decks`,
            method: 'POST',
            body: params,
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation } = decksApi
