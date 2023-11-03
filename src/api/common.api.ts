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

export type DecksType = {
  items: CardsResponsType[]
}

export const cardsService: any = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponsType, void>({
        query: id => `v1/decks/${id}/cards`,
        providesTags: ['Cards'],
      }),
      // getDecks: builder.query<DecksType, void>({
      //   query: () => `v1/decks`,
      //   providesTags: ['Decks'],
      // }),
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

export const { useGetCardsQuery } = cardsService
