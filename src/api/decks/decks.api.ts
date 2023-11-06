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

type DeleteDeckResponseType = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksType, GetDecksParamsType | void>({
        providesTags: ['Decks'],
        query: params => {
          return {
            params: params ?? undefined,
            url: `v1/decks`,
          }
        },
      }),
      createDeck: builder.mutation<CardsResponsType, { name: string }>({
        invalidatesTags: ['Decks'],
        query: params => {
          return {
            method: 'POST',
            url: `v1/decks`,
            body: params,
          }
        },
      }),
      deleteDeck: builder.mutation<DeleteDeckResponseType, string>({
        query: id => {
          return {
            method: 'DELETE',
            url: `v1/decks/${id}`,
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useCreateDeckMutation, useGetDecksQuery, useDeleteDeckMutation } = decksApi
