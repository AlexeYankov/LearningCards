import { baseApi } from './cards.api'
import { isEmpty } from 'remeda'

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
  currentPage?: number
  itemsPerPage?: number
  totalItems?: number
  totalPages?: number
  minCardsCount?: number
  maxCardsCount?: number
}

type GetCardsParamsType = {
  id?: string
  answer?: string
  question?: string
  orderBy?: 'name-asc' | 'name-desc'
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
      deleteCard: builder.mutation<UpdateCardsType, void>({
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

      // getDecks: builder.query<DecksType, void>({
      //   providesTags: ['Decks'],
      //   query: () => `v1/decks`,
      // }),
      updateCard: builder.mutation<UpdateCardsType, CardsResponseType>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...patch }) => ({
          body: patch,
          method: 'PATCH',
          url: `v1/cards/${id}`,
        }),
      }),

      createCard: builder.mutation<CardsResponsType, { id: string; data: FormData }>({
        invalidatesTags: ['Cards'],
        query: ({ id, data }) => {
          return {
            method: 'POST',
            url: `v1/decks/${id}/cards`,
            body: data,
          }
        },
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardQuery,
  useGetCardsQuery,
  useUpdateCardMutation,
} = cardsService
