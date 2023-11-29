import { baseApi } from '@/api/cards.api.ts'
import { CardsResponsType, DecksType } from '@/api/common.api.ts'

type GetDecksParamsType = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: 'name-asc' | 'name-desc'
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

type UpdateDeckResponseType = {
  author: UpdateDeckResponseTypeAuthor
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
export type UpdateDeckResponseTypeAuthor = {
  id: string
  name: string
}

export type UpdateDeckArgType = {
  id: string
  cover?: File | string
  name: string
  isPrivate?: boolean
}

export type CreateDeckArgType = {
  cover?: File
  name: string
  isPrivate?: boolean
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
      createDeck: builder.mutation<CardsResponsType, CreateDeckArgType>({
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
      updateDeck: builder.mutation<UpdateDeckResponseType, { form: FormData; id: string }>({
        query: ({ form, id }) => {
          return {
            method: 'PATCH',
            url: `v1/decks/${id}`,
            body: form,
          }
        },
        invalidatesTags: ['Decks'],
      }),
      learnRandomCard: builder.query<CardsResponsType, string>({
        query: id => {
          return {
            url: `v1/decks/${id}/learn`,
          }
        },
        providesTags: ['Decks', 'Cards'],
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useGetDecksQuery,
  useLearnRandomCardQuery,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} = decksApi
