import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { decksApi } from '@/api/decks/decks.api.ts'
import paginationReducer from '@/api/decks/pagination.reducer.ts'
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { baseApi } from './cards.api'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(decksApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [decksApi.reducerPath]: decksApi.reducer,
    pagination: paginationReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

setupListeners(store.dispatch)
