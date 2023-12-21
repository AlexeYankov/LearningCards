import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { decksApi } from '@/api/decks/decks.api.ts'
import cardsReducer from '@/api/cards/cards'
import decksReducer from '@/api/decks/decks.reducer.ts'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { baseApi } from './base.api.ts'
import profileReducer from '@/api/profile/profile.reducer.ts'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(decksApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    decks: decksReducer,
    cards: cardsReducer,
    profile: profileReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)
