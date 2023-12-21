import { baseApi } from '../base.api.ts'
import { isEmpty } from 'remeda'
import { Sort } from '@/components/ui/decks'

export type CardsResponseType = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
  grade: number
  shots: number
  updated: string
  userId: string
}

export type UpdateCardsType = {
  answer: string
  answerImg: string
  answerVideo: string
  question: string
  questionImg: string
  questionVideo: string
}

export type CardsType = {
  items?: CardsResponseType[]
  maxCardsCount?: number
  pagination?: PaginationResponseType
}
export type CreateCardParams = {
  questionImg?: File
  answerImg?: File
  questionVideo?: string
  answerVideo?: string
  answer?: string
  question?: string
}
export type PaginationResponseType = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
  minCardsCount: number
  maxCardsCount: number
}

type GetCardsParamsType = {
  id?: string
  answer?: string
  question?: string
  orderBy?: Sort
  currentPage?: number
  itemsPerPage?: number
}

export const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<Omit<CardsType, 'maxCardsCount'>, GetCardsParamsType>({
        providesTags: ['Cards'],
        query: ({ id, ...params }) => {
          return {
            url: `v1/decks/${id}/cards`,
            params: isEmpty(params) ? undefined : params,
          }
        },
      }),
      deleteCard: builder.mutation<UpdateCardsType, string>({
        invalidatesTags: ['Cards'],
        query: id => ({
          method: 'DELETE',
          url: `v1/cards/${id}`,
        }),
      }),
      getCard: builder.query<CardsResponseType, void>({
        providesTags: ['Cards'],
        query: id => `v1/cards/${id}`,
      }),

      updateCard: builder.mutation<UpdateCardsType, { id: string; data: FormData }>({
        invalidatesTags: ['Cards'],
        query: ({ id, data }) => ({
          body: data,
          method: 'PATCH',
          url: `v1/cards/${id}`,
        }),
      }),

      createCard: builder.mutation<CardsResponseType, { id: string; data: FormData }>({
        invalidatesTags: ['Cards'],
        query: ({ id, data }) => {
          return {
            method: 'POST',
            url: `v1/decks/${id}/cards`,
            body: data,
          }
        },
      }),
      saveCardGrade: builder.mutation<
        void,
        {
          id: string
          data: { cardId: string; grade: number }
        }
      >({
        query: ({ id, data }) => ({
          method: 'POST',
          url: `v1/cards/${id}/grades`,
          body: data,
        }),
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} = cardsService
