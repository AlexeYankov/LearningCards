import { baseApi } from '@/api/base'
import { CardsResponseType } from '@/api/cards'
import {
  CreateDeckArgType,
  DecksType,
  DeleteDeckResponseType,
  GetDecksParamsType,
  LearnRandomPostArg,
  ResponseDeckType,
  UpdateDeckResponseType,
} from '@/types/decks'

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
        providesTags: ['Decks'],
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
