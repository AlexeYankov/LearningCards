import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { baseApi } from '@/api/base'
import cardsReducer from '@/api/cards/cards.reducer'
import { decksApi } from '@/api/decks'
import decksReducer from '@/api/decks/decks.reducer'
import profileReducer from '@/api/profile/profile.reducer'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(decksApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cards: cardsReducer,
    decks: decksReducer,
    profile: profileReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)
