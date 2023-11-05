import { baseApi } from './cards.api'

export type CardsResponsType = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
  rating: number
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

export type DecksType = {
  items?: CardsResponsType[]
  maxCardsCount?: number
  pagination?: PaginationResponseType
}

export type PaginationResponseType = {
  currentPage?: number
  itemsPerPage?: number
  totalItems?: number
  totalPages?: number
}

export const cardsService: any = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<UpdateCardsType, void>({
        invalidatesTags: ['Cards'],
        query: id => ({
          method: 'DELETE',
          url: `v1/cards/${id}`,
        }),
      }),
      getCard: builder.query<CardsResponsType, void>({
        providesTags: ['Cards'],
      }),
      getDecks: builder.query<DecksType, void>({
        providesTags: ['Decks'],
        query: () => `v1/decks`,
      }),
      updateCard: builder.mutation<UpdateCardsType, CardsResponsType>({
        invalidatesTags: ['Cards'],
        query: ({ id, ...patch }) => ({
          body: patch,
          method: 'PATCH',
          url: `v1/cards/${id}`,
        }),
        invalidatesTags: ['Cards'],
        query: ({ id, ...patch }) => ({
          body: patch,
          method: 'PATCH',
          url: `v1/cards/${id}`,
        }),
      }),
    }
  },
})

export const { useGetCardsQuery } = cardsService
export const {
  useDeleteCardMutation,
  useGetCardQuery,
  useGetCardsQuery,
  useGetDecksQuery,
  useUpdateCardMutation,
} = cardsService
