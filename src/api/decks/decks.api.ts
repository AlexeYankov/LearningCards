import { baseApi } from '@/api/cards.api.ts'
import { CardsResponseType, PaginationResponseType } from '@/api/common.api.ts'
import { Sort } from '@/components/ui/table/types.ts'

type GetDecksParamsType = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: Sort
}

export type DecksType = {
  items: ResponseDeckType[]
  maxCardsCount: number
  pagination: PaginationResponseType
}

export type ResponseDeckTypeItemsAuthor = {
  id: string
  name: string
}
export type ResponseDeckType = {
  author: ResponseDeckTypeItemsAuthor
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

export type CreateDeckArgType = {
  cover?: File
  name: string
  isPrivate?: boolean
}

export type LearnRandomPostArg = {
  id?: string
  cardId?: string
  grade: number
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
      getDecksById: builder.query<ResponseDeckType, string>({
        query: id => {
          return {
            url: `v1/decks/${id}`,
          }
        },
        providesTags: ['Cards']
      }),
      createDeck: builder.mutation<ResponseDeckType, CreateDeckArgType>({
        invalidatesTags: ['Decks'],
        query: body => {
          return {
            method: 'POST',
            url: `v1/decks`,
            body,
          }
        },
        // onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
        //   const result = await queryFulfilled
        //   const state = getState() as RootState
        //   const { name, sort, itemsPerPage, currentPage, authorId, minCardsCount, maxCardsCount } =
        //     state.decks
        //   dispatch(
        //     decksApi.util.updateQueryData(
        //       'getDecks',
        //       {
        //         name,
        //         maxCardsCount,
        //         minCardsCount,
        //         authorId,
        //         currentPage,
        //         itemsPerPage,
        //         orderBy: sort?.direction as Sort,
        //       },
        //       draft => {
        //         draft.items?.unshift(result.data)
        //       }
        //     )
        //   )
        // },
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
      learnRandomCard: builder.query<CardsResponseType, string>({
        query: id => {
          return {
            url: `v1/decks/${id}/learn`,
          }
        },
        providesTags: ['Cards'],
      }),
      learnRandomPost: builder.mutation<void, LearnRandomPostArg>({
        query: body => {
          return {
            method: 'POST',
            url: `v1/decks/${body.id}/learn`,
            body: { cardId: body.cardId, grade: body.grade },
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGetDecksByIdQuery,
  useLearnRandomCardQuery,
  useCreateDeckMutation,
  useGetDecksQuery,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
  useLearnRandomPostMutation,
} = decksApi
