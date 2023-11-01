import { baseApi } from './cards.api'

export type CardsResponsType = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}
export type UpdateCardsType = {
  question: string
  answer: string
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
}

export const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponsType, void>({
        query: id => `v1/cards/:${id}`,
        providesTags: ['Cards'],
      }),
      updateCards: builder.mutation<UpdateCardsType, CardsResponsType>({
        query: ({ id, ...patch }) => ({
          url: `v1/cards/:${id}`,
          method: 'PATCH',
          body: patch,
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})
